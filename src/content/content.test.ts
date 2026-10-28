import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { teachingPlanPrompts } from './prompts/teachingPlans'
import { lessonById, lessons, lessonsInTrack, tracks } from './lessons'
import { categoryById, promptById, promptCategories, prompts } from './prompts'
import { lessonsForVideo, promptsForLesson, videosForLesson } from './relations'
import { isPlayable, series, videoById, videos } from './videos'
import { fillPlaceholders, filterPrompts, placeholdersOf, scorePrompt, defaultFilters } from '../lib/promptSearch'

const label = (id: keyof typeof categoryById) => categoryById[id].label

describe('prompt library', () => {
  it('has at least 316 prompts with unique ids and full text', () => {
    expect(prompts.length).toBeGreaterThanOrEqual(316)
    expect(new Set(prompts.map(prompt => prompt.id)).size).toBe(prompts.length)
    for (const prompt of prompts) {
      expect(prompt.content.length, prompt.id).toBeGreaterThan(120)
      expect(prompt.title.trim(), prompt.id).not.toBe('')
      expect(prompt.tags.length, prompt.id).toBeGreaterThan(0)
      expect(prompt.supportedTools.length, prompt.id).toBeGreaterThan(0)
    }
  })

  it('meets the planned count per category', () => {
    const planned: Record<string, number> = { study: 20, slides: 20, image: 20, video: 20, research: 25, literature: 20, methods: 15, data: 20, writing: 15, english: 15, code: 20, agent: 20, teaching: 36, audio: 10, admin: 10, career: 10, creative: 10, ethics: 10 }
    expect(promptCategories).toHaveLength(18)
    for (const category of promptCategories) expect(prompts.filter(prompt => prompt.category === category.id).length, category.id).toBeGreaterThanOrEqual(planned[category.id])
  })

  it('never repeats the same prompt body', () => {
    expect(new Set(prompts.map(prompt => prompt.content.trim())).size).toBe(prompts.length)
  })

  it('links only to lessons that exist', () => {
    for (const prompt of prompts) for (const id of prompt.relatedLessonIds) expect(lessonById[id], `${prompt.id} → ${id}`).toBeDefined()
  })

  it('keeps subcategories usable as filters', () => {
    for (const category of promptCategories) {
      const subs = new Set(prompts.filter(prompt => prompt.category === category.id).map(prompt => prompt.subcategory))
      expect(subs.size, category.id).toBeLessThanOrEqual(10)
    }
  })

  it('reminds research prompts not to fabricate sources', () => {
    for (const prompt of prompts.filter(item => ['research', 'literature', 'methods'].includes(item.category))) expect(prompt.content, prompt.id).toMatch(/(不得|不要|請勿|不可|勿)[^。\n]{0,10}(編造|捏造|虛構|杜撰)/)
  })

  it('keeps eight original featured prompts plus the lesson plan entry', () => {
    const featured = prompts.filter(prompt => prompt.featured).length
    expect(featured).toBeGreaterThanOrEqual(6)
    expect(featured).toBeLessThanOrEqual(9)
  })
})

describe('search', () => {
  const search = (query: string) => filterPrompts(prompts, { ...defaultFilters, query }, label)
  it.each(['簡報', '照片', '圖片', '影片', '論文', '文獻', '資料分析', '研究方法', '讀書計畫', 'PPT', 'AI Agent', 'Literature Review', 'Image', '英文', '教案', '公文', '行銷', 'Python'])('finds results for %s', query => {
    expect(search(query).length).toBeGreaterThan(0)
  })
  it('treats PPT and 簡報 as the same', () => {
    expect(search('PPT').map(prompt => prompt.id)).toEqual(expect.arrayContaining(['slides-01']))
  })
  it('finds photography, research and presentation prompts across categories', () => {
    const photo = search('照片')
    expect(photo.map(prompt => prompt.id)).toEqual(expect.arrayContaining(['image-13', 'image-14', 'image-18']))
    expect(new Set(search('研究').map(prompt => prompt.category))).toEqual(expect.objectContaining({ size: expect.any(Number) }))
    for (const category of ['research', 'literature', 'methods', 'data'] as const) expect(search('研究').some(prompt => prompt.category === category), category).toBe(true)
    expect(search('簡報').filter(prompt => prompt.category === 'slides').length).toBeGreaterThanOrEqual(15)
  })
  it('filters by subcategory within a category', () => {
    const list = filterPrompts(prompts, { ...defaultFilters, category: 'image', subcategory: '商業攝影' }, label)
    expect(list.length).toBeGreaterThan(0)
    expect(list.every(prompt => prompt.subcategory === '商業攝影')).toBe(true)
  })
  it('returns nothing for nonsense and combines with filters', () => {
    expect(search('zzqqxx不存在的詞')).toHaveLength(0)
    const research = filterPrompts(prompts, { ...defaultFilters, query: '文獻', category: 'research' }, label)
    expect(research.every(prompt => prompt.category === 'research')).toBe(true)
    expect(scorePrompt(promptById['slides-01'], '')).toBe(1)
  })
})

describe('placeholders', () => {
  it('fills only what was entered and keeps the rest visible', () => {
    const text = '主題：[填入主題]\n對象：[填入對象]'
    expect(placeholdersOf(text)).toEqual(['填入主題', '填入對象'])
    expect(fillPlaceholders(text, { 填入主題: 'AI 素養' })).toBe('主題：AI 素養\n對象：[填入對象]')
  })
})

describe('videos and lessons', () => {
  it('registers the eight official videos with unchanged codes', () => {
    expect(videos.map(video => video.id)).toEqual(['A01', 'A02', 'A03', 'B01', 'B02', 'B03', 'C01', 'C02'])
  })
  it('links every video to a lesson and back', () => {
    for (const video of videos) {
      const linked = lessonsForVideo(video)
      expect(linked.length, video.id).toBeGreaterThan(0)
      for (const lesson of linked) expect(videosForLesson(lesson).map(item => item.id), lesson.id).toContain(video.id)
    }
  })
  it('never shows a video as playable without a real source', () => {
    for (const video of videos) if (!video.videoUrl) expect(isPlayable(video), video.id).toBe(false)
    for (const video of videos) if (video.status === 'published') expect(video.videoUrl, video.id).toBeDefined()
  })
  it('keeps every series reachable', () => {
    for (const video of videos) expect(series.some(item => item.id === video.seriesId)).toBe(true)
  })
  it('has the planned number of lessons per track', () => {
    const planned = { 'chatgpt-web': 3, 'gemini-web': 3, 'chatgpt-desktop': 0, 'gemini-desktop': 0, literacy: 2, 'agent-learning': 10, 'agent-research': 12 }
    for (const track of tracks) expect(lessonsInTrack(track.id).length, track.id).toBe(planned[track.id])
  })
  it('gives each lesson complete teaching parts and unique section anchors', () => {
    expect(new Set(lessons.map(lesson => lesson.id)).size).toBe(lessons.length)
    for (const lesson of lessons) {
      expect(lesson.learningObjectives.length, lesson.id).toBeGreaterThan(2)
      expect(lesson.concepts.length, lesson.id).toBeGreaterThan(0)
      expect(lesson.examples.length, lesson.id).toBeGreaterThan(0)
      expect(lesson.mistakes.length, lesson.id).toBeGreaterThan(0)
      expect(lesson.practice.tasks.length, lesson.id).toBeGreaterThan(0)
      const ids = [...lesson.concepts, ...lesson.steps, ...lesson.extension].map(section => section.id)
      expect(new Set(ids).size, lesson.id).toBe(ids.length)
      for (const id of lesson.relatedVideoIds) expect(videoById[id], `${lesson.id} → ${id}`).toBeDefined()
      for (const id of lesson.relatedPromptIds) expect(promptById[id], `${lesson.id} → ${id}`).toBeDefined()
    }
  })
  it('recommends prompts for the core tool lessons', () => {
    for (const id of ['chatgpt-a02', 'gemini-b02', 'agent-l02']) expect(promptsForLesson(lessonById[id]).length, id).toBeGreaterThan(1)
  })
  it('marks the campus AI server information as pending', () => {
    expect(JSON.stringify(lessonById['research-r12'])).toContain('待計中確認')
  })
  it('does not describe a Gem as retraining the model', () => {
    expect(JSON.stringify(lessonById['gemini-b03'])).toMatch(/不是.{0,12}(重新)?訓練|不會.{0,12}(重新)?訓練/)
  })
})

describe('language', () => {
  it('avoids common Mainland-usage terms', () => {
    // writing-03 is a proofreading prompt that lists these words on purpose, to convert them.
    const text = JSON.stringify({ prompts: prompts.filter(prompt => prompt.id !== 'writing-03'), lessons, videos })
    for (const word of ['視頻', '軟件', '信息', '默認', '用戶', '質量', '文檔', '網絡', '數據庫', '屏幕']) expect(text.includes(word), word).toBe(false)
  })
})

describe('complete lesson planning', () => {
  const core = promptById['teach-core']
  it('preserves the handoff template verbatim with the added strategy field', () => {
    const handoff = readFileSync(new URL('../../HANDOFF_TO_CODEX.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
    const original = handoff.match(/```text\n([\s\S]*?)\n```/)![1]
    expect(core.content).toBe(original.replace('* 特殊教學需求：[如有請說明]', '* 特殊教學需求：[如有請說明]\n* 預計採用的教學策略：[教學策略]'))
    expect(core.title).toBe('專業完整教案設計與教學活動規劃')
    expect(core.content.length).toBeGreaterThan(2000)
    for (let number = 1; number <= 18; number++) expect(core.content).toMatch(new RegExp(`(^|\\n)${number}\\. `))
    for (const letter of 'ABCDEFGHIJ') expect(core.content).toMatch(new RegExp(`(^|\\n)${letter}\\. `))
    expect(core.content).toContain('18. 教學省思與精進建議')
    expect(core.content).toContain('J. 課後延伸、教學省思及精進方向')
    expect(core.content.endsWith('若發現問題，請直接修正後再提供最終教案。')).toBe(true)
  })
  it('provides fifteen distinct supplemental lesson plans with complete task contracts', () => {
    expect(teachingPlanPrompts).toHaveLength(16)
    for (const prompt of teachingPlanPrompts.filter(item => item.id !== 'teach-core')) {
      expect(prompt.content.length, prompt.id).toBeGreaterThan(500)
      for (const heading of ['一、必要輸入', '二、設計與處理步驟', '三、預期輸出', '四、品質檢查']) expect(prompt.content, prompt.id).toContain(heading)
      expect(prompt.content).toContain('不得編造課綱代碼、文獻或教學成效')
      expect(prompt.content).toContain('不得輸入學生個資')
      expect(prompt.content).toContain('產出須由教師審閱')
    }
    expect(promptById['teach-24'].content).toContain('不得自行生成、補寫或推測課綱代碼')
  })
  it.each(['教案', '試教', '教學設計', '教學活動', 'lesson plan'])('recommends the complete template for %s', query => {
    expect(filterPrompts(prompts, { ...defaultFilters, query }, label)[0].id).toBe('teach-core')
  })
  it('maps every placeholder once to a labeled field in three groups', () => {
    expect(core.form).toHaveLength(14)
    expect(new Set(core.form!.map(field => field.group)).size).toBe(3)
    expect(core.form!.map(field => field.placeholder).sort()).toEqual(placeholdersOf(core.content).sort())
    for (const field of core.form!) {
      expect(field.label).not.toBe('')
      if (['select', 'multiselect'].includes(field.type)) expect(field.options!.length).toBeGreaterThan(1)
    }
  })
  it('preserves all output requirements when empty, partially filled or multiselected', () => {
    expect(fillPlaceholders(core.content, {})).toBe(core.content)
    const result = fillPlaceholders(core.content, { '填入科目': '自然科學', '填入年級': '  ', '教學策略': ['合作學習', '探究式學習'].join('、') })
    expect(result).toContain('教學領域／科目：自然科學')
    expect(result).toContain('年級：[填入年級]')
    expect(result).toContain('預計採用的教學策略：合作學習、探究式學習')
    expect(result.slice(result.indexOf('二、教案設計要求'))).toBe(core.content.slice(core.content.indexOf('二、教案設計要求')))
    expect(core.content).toContain('[填入科目]')
  })
})
