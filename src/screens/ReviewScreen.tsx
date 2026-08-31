import type { UiPath } from '@uipath/uipath-typescript/core'
import { DataTable } from '@uipath/ui-widgets-datatable'
import '@uipath/ui-widgets-datatable/DataTable.css'

// ─── ClaimDesk config — edit for your tenant ────────────────────────────────
// UUID of the Data Fabric entity "Claims" (fields: Id, ClaimId, ClaimName,
// ClaimAmount, ClaimStatus, ClaimSubmittedDate). Browse/edit grid.
const CLAIM_ENTITY_ID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
// ───────────────────────────────────────────────────────────────────────────

export default function ReviewScreen({ sdk }: { sdk: UiPath }) {
  return (
    <section>
      <h2>Review claims</h2>
      <div style={{ height: 480 }}>
        <DataTable sdk={sdk} entityId={CLAIM_ENTITY_ID} pageSize={25} showIdColumn />
      </div>
    </section>
  )
}
