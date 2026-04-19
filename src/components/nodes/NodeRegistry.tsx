/* eslint-disable react-refresh/only-export-components */
import type { ProcessDetailType } from "../../types/schema";
import NodeWrapper, { DetailRow } from "./NodeWrapper";

const TowingNode = ({ data }: { data: Extract<ProcessDetailType, { title: "Towing Service" }> }) => (
  <NodeWrapper title={data.title} status={data.status}>
    <DetailRow label="Pickup Location" value={data.pickupLocation} />
    <DetailRow label="Towing Date" value={data.towingDate} />
  </NodeWrapper>
);

const NotificationNode = ({ data }: { data: Extract<ProcessDetailType, { title: "Claim Notification" }> }) => (
  <NodeWrapper title={data.title} status={data.status}>
    <DetailRow label="Date & Time" value={data.dateTime} />
    <DetailRow label="Reason" value={data.reasonForDamage} />
    <DetailRow label="Reporting Party" value={data.reportingParty} />
    <DetailRow label="Contact" value={data.contact} />
  </NodeWrapper>
);

const AppraisalNode = ({ data }: { data: Extract<ProcessDetailType, { title: "Appraisal" }> }) => (
  <NodeWrapper title={data.title} status={data.status}>
    <DetailRow label="Expert Info" value={data.expertInfo} />
    <DetailRow label="Assignment Date" value={data.expertAssignmentDate} />
    <DetailRow label="Contact" value={data.contact} />
  </NodeWrapper>
);

const GenericNode = ({ data }: { data: ProcessDetailType }) => {
  const entries = Object.entries(data).filter(([key]) => !['title', 'status', 'id'].includes(key));
  
  return (
    <NodeWrapper title={data.title} status={data.status}>
      {entries.map(([key, value]) => (
        <DetailRow key={key} label={key.replace(/([A-Z])/g, ' $1').trim()} value={String(value)} />
      ))}
    </NodeWrapper>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NodeRegistry: Record<string, React.FC<any>> = {
  "Towing Service": TowingNode,
  "Claim Notification": NotificationNode,
  "Appraisal": AppraisalNode,
  "Substitute Rental Vehicle": GenericNode,
  "File Review": GenericNode,
  "Deduction Reason": GenericNode,
  "Payment Information": GenericNode,
  "Closed": GenericNode,
  "Information Note": GenericNode,
  "Additional Attachment": GenericNode,
};