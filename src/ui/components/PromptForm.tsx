import { useId } from 'react'
import type { PromptFormField } from '../../content/types'

export function PromptForm({ fields, values, onChange }: { fields: PromptFormField[]; values: Record<string, string>; onChange: (name: string, value: string) => void }) {
  const prefix = useId()
  const groups = [...new Set(fields.map(field => field.group))]
  return <div className="lesson-plan-form">
    {groups.map((group, index) => <fieldset className="plan-group" key={group}>
      <legend><span className="mono">0{index + 1}</span> {group}</legend>
      <div className="fill-grid">{fields.filter(field => field.group === group).map((field, fieldIndex) => {
        const id = `${prefix}-${index}-${fieldIndex}`
        const value = values[field.placeholder] ?? ''
        const set = (next: string) => onChange(field.placeholder, next)
        if (field.type === 'multiselect') return <fieldset className="plan-strategies" key={field.placeholder}>
          <legend>{field.label}（可多選）</legend>
          {field.options?.map(option => <label key={option}>
            <input type="checkbox" checked={value.split('、').includes(option)} onChange={event => {
              const selected = new Set(value.split('、').filter(Boolean))
              if (event.target.checked) selected.add(option)
              else selected.delete(option)
              set(field.options!.filter(item => selected.has(item)).join('、'))
            }} /><span>{option}</span>
          </label>)}
        </fieldset>
        return <div className={`plan-field ${value.trim() ? 'is-filled' : ''}`} key={field.placeholder}>
          <label htmlFor={id}>{field.label}</label>
          {field.type === 'select'
            ? <select id={id} value={value} onChange={event => set(event.target.value)}><option value="">請選擇（可留空）</option>{field.options?.map(option => <option key={option}>{option}</option>)}</select>
            : field.type === 'textarea'
              ? <textarea id={id} rows={3} value={value} maxLength={2000} placeholder={`[${field.placeholder}]`} onChange={event => set(event.target.value)} />
              : <input id={id} type={field.type} min={field.type === 'number' ? 1 : undefined} step={field.type === 'number' ? 1 : undefined} value={value} maxLength={field.type === 'text' ? 200 : undefined} placeholder={`[${field.placeholder}]`} onChange={event => set(event.target.value)} />}
        </div>
      })}</div>
    </fieldset>)}
    <p className="muted small">可只填部分條件；其他需求可在複製後補充。這裡只整理提示詞，教案由你選用的 AI 工具協助產出。</p>
  </div>
}
