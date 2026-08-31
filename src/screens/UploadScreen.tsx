import { useState } from 'react'
import type { UiPath } from '@uipath/uipath-typescript/core'
import { MultiFileUpload } from '@uipath/ui-widgets-multi-file-upload'
import '@uipath/ui-widgets-multi-file-upload/MultiFileUpload.css'

// ─── ClaimDesk config — edit for your tenant ────────────────────────────────
// Orchestrator Storage Bucket named "claim-documents": its numeric Id.
const BUCKET_ID = 133506
// Numeric Id of the Orchestrator folder that contains that bucket.
const BUCKET_FOLDER_ID = 1012669
// Path prefix applied to every uploaded file inside the bucket.
const UPLOAD_PATH = 'claim-documents/'
// Accepted file types.
const ACCEPT = '.pdf'
// ───────────────────────────────────────────────────────────────────────────

export default function UploadScreen({
  sdk,
  onUploaded,
}: {
  sdk: UiPath
  onUploaded: () => void
}) {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  return (
    <section>
      <h2>Upload claim documents</h2>
      <MultiFileUpload
        sdk={sdk}
        bucketId={BUCKET_ID}
        folderId={BUCKET_FOLDER_ID}
        path={UPLOAD_PATH}
        accept={ACCEPT}
        onUploadSuccess={(files) => {
          setMsg({ ok: true, text: `Uploaded ${files.length} file(s).` })
          onUploaded()
        }}
        onUploadError={(err) => setMsg({ ok: false, text: err.message })}
      />
      {msg && (
        <p role="status" style={{ color: msg.ok ? 'green' : 'crimson' }}>
          {msg.text}
        </p>
      )}
    </section>
  )
}
