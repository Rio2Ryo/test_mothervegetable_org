import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    const filePath = join(process.cwd(), 'public', filename)

    // ファイルを読み込む
    const fileBuffer = await readFile(filePath)

    // Content-Typeを決定
    const contentType = getContentType(filename)

    // ダウンロードヘッダーを設定
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return new NextResponse('File not found', { status: 404 })
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

