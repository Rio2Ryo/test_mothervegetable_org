'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import CountdownTimer from '@/components/CountdownTimer'
import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const { t, language } = useLanguage()
  const [countdown, setCountdown] = useState('')
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const targetDate = new Date('2025-11-11T11:00:00Z') // UTC time

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setCountdown('Launched!')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    updateCountdown() // Initial update
    const interval = setInterval(updateCountdown, 1000) // Update every second

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])
  const scrollToDetails = () => {
    const element = document.getElementById('project-overview')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToToken = () => {
    const element = document.getElementById('token')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !isMuted
    video.muted = nextMuted

    if (video.paused) {
      void video.play().catch(() => {})
    }

    setIsMuted(nextMuted)
  }


  const downloadWhitepaper = () => {
    const link = document.createElement('a')
    link.href = '/0912_whitepaper_ja.pdf'
    link.download = 'MOTHER_VEGETABLES_Whitepaper_JP.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-earth-regeneration-Dnk2z_VF.png"
          alt="Earth Regeneration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 transition-all duration-1500 pt-40 md:pt-48 lg:pt-56">
        {/* Title Section - Single Component */}
        <div className="mb-12">

          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/mazavege_logo_midori.png"
              alt="Mother Vegetable Logo"
              width={140}
              height={140}
              className="mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
              priority
            />
          </div>

          <div
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 4px rgba(34, 197, 94, 0.2))',
            }}
          >
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              <div>MOTHER VEGETABLE PROJECT</div>
            </h1>
          </div>

          <div className="w-40 md:w-48 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-6 opacity-80"></div>

        </div>


        {/* Description - Not in Box */}
        <div className="max-w-4xl mx-auto mb-12 mt-16 px-4">
          <div className="space-y-3">
            <p className="text-lg md:text-xl text-[#4ade80] leading-relaxed">
              {t({
                JP: '35億年前の地球はじまりの植物',
                EN: 'The vegetable from 3.5 billion years ago'
              })}
            </p>
            <p className="text-lg md:text-xl text-[#4ade80] leading-relaxed">
              {t({
                JP: '「マザーベジタブル」',
                EN: '"Mother Vegetable"'
              })}
            </p>
            <p className="text-lg md:text-xl text-[#4ade80] leading-relaxed">
              {t({
                JP: '地球が生み出した生命力を、あなたに。',
                EN: 'Earth’s life force, for you.'
              })}
            </p>
          </div>
        </div>

      {/* Mother Vegetable Video */}
      <div className="w-[80%] sm:w-[85%] md:w-[75%] lg:w-[60%] xl:w-[50%] max-w-2xl mx-auto mb-40 mt-32 px-0 sm:px-4">
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          <video
            ref={videoRef}
            className="w-full h-auto"
            src="/mazavege_anime%231_fin.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
          <button
            onClick={toggleMute}
            aria-label={
              isMuted
                ? language === 'JP'
                  ? 'ミュート解除'
                  : 'Unmute'
                : language === 'JP'
                ? 'ミュート'
                : 'Mute'
            }
            className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full bg-black/40 px-3 py-3 text-white backdrop-blur-md transition hover:bg-black/60"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                <line x1="16" y1="9" x2="20" y2="13" />
                <line x1="20" y1="9" x2="16" y2="13" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                <path d="M16 9a4 4 0 0 1 0 6" />
                <path d="M18.5 7.5a7 7 0 0 1 0 9" />
              </svg>
            )}
          </button>
        </div>
      </div>


      </div>
    </section>
  )
}