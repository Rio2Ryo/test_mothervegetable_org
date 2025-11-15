import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    
    // ファイル名のURLデコード
    const decodedFilename = decodeURIComponent(filename)
    
    // セキュリティチェック: パストラバーサル攻撃を防ぐ
    if (decodedFilename.includes('..') || decodedFilename.includes('/')) {
      return new NextResponse('Invalid filename', { status: 400 })
    }
    
    const filePath = join(process.cwd(), 'public', decodedFilename)
    
    console.log('Attempting to download:', {
      filename,
      decodedFilename,
      filePath,
      cwd: process.cwd()
    })

    // ファイルを読み込む
    const fileBuffer = await readFile(filePath)

    // Content-Typeを決定
    const contentType = getContentType(decodedFilename)

    // BufferをBlobに変換（Next.js 15の要件）
    const blob = new Blob([fileBuffer], { type: contentType })

    // ダウンロードヘッダーを設定
    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${decodedFilename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new NextResponse(`File not found: ${errorMessage}`, { status: 404 })
  }
}

function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const contentTypes: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    mp4: 'video/mp4',
    zip: 'application/zip',
  }
  return contentTypes[ext || ''] || 'application/octet-stream'
}

