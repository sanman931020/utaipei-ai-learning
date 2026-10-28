import { useState } from 'react'

/**
 * Official logos, served from public/brand/. Replacing a logo means replacing its file there.
 * If a file is missing the logo is simply left out, so the site never shows a broken image.
 */
const officialLogos = {
  university: { src: 'brand/utaipei-logo.png', alt: '臺北市立大學 University of Taipei' },
  computingCenter: { src: 'brand/computing-center-logo.png', alt: '臺北市立大學計算機與網路中心 Computing Center' },
}

export function OfficialLogo({ logo, className = '' }: { logo: keyof typeof officialLogos; className?: string }) {
  const [missing, setMissing] = useState(false)
  if (missing) return null
  const { src, alt } = officialLogos[logo]
  return <img className={`official-logo is-${logo} ${className}`} src={`${import.meta.env.BASE_URL}${src}`} alt={alt} decoding="async" onError={() => setMissing(true)} />
}
