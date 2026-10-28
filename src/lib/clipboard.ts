/**
 * Copies plain text. Uses the Clipboard API when the page is allowed to, and falls back to a
 * hidden textarea + execCommand for older browsers or non-secure contexts (e.g. http on a LAN).
 */
export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return true } catch { /* Fall through to the legacy path. */ }
  }
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.top = '-1000px'
  area.style.opacity = '0'
  document.body.appendChild(area)
  const selection = document.getSelection()
  const previous = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null
  area.select()
  let ok = false
  try { ok = document.execCommand('copy') } catch { ok = false }
  area.remove()
  if (previous && selection) { selection.removeAllRanges(); selection.addRange(previous) }
  return ok
}
