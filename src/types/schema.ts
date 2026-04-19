import { z } from "zod";

export const TowingServiceSchema = z.object({
  title: z.literal("Towing Service"),
  status: z.string(),
  pickupLocation: z.string(),
  towingDate: z.string(),
});

export const ClaimNotificationSchema = z.object({
  title: z.literal("Claim Notification"),
  status: z.string(),
  dateTime: z.string(),
  reportType: z.string(),
  reasonForDamage: z.string(),
  reportingParty: z.string(),
  contact: z.string(),
});

export const AppraisalSchema = z.object({
  title: z.literal("Appraisal"),
  status: z.string(),
  expertAssignmentDate: z.string(),
  expertInfo: z.string(),
  contact: z.string().optional(),
});

export const SubstituteRentalVehicleSchema = z.object({
  title: z.literal("Substitute Rental Vehicle"),
  status: z.string(),
  vehicleDuration: z.string(),
  vehicleModel: z.string(),
  extraDuration: z.string(),
});

export const FileReviewSchema = z.object({
  title: z.literal("File Review"),
  status: z.string(),
  reviewReferralDate: z.string(),
  reviewCompletionDate: z.string(),
});

export const DeductionReasonSchema = z.object({
  title: z.literal("Deduction Reason"),
  status: z.string(),
  actionRequired: z.string(),
  occupationalDeduction: z.string(),
  appreciationDeduction: z.string(),
  policyDeductible: z.string(),
  nonDamageAmount: z.string(),
});

export const PaymentInformationSchema = z.object({
  title: z.literal("Payment Information"),
  status: z.string(),
  paidTo: z.string(),
  iban: z.string(),
  paymentAmount: z.string(),
  note: z.string(),
});

export const ClosedSchema = z.object({
  title: z.literal("Closed"),
  status: z.string(),
  completionDate: z.string(),
});

export const InformationNoteSchema = z.object({
  title: z.literal("Information Note"),
  status: z.string(),
  note: z.string(),
  id: z.string().optional(),
});

export const AdditionalAttachmentSchema = z.object({
  title: z.literal("Additional Attachment"),
  status: z.string(),
  fileName: z.string(),
  fileSize: z.string(),
  id: z.string().optional(),
});

export const ProcessDetailSchema = z.discriminatedUnion("title", [
  TowingServiceSchema,
  ClaimNotificationSchema,
  AppraisalSchema,
  SubstituteRentalVehicleSchema,
  FileReviewSchema,
  DeductionReasonSchema,
  PaymentInformationSchema,
  ClosedSchema,
  InformationNoteSchema,
  AdditionalAttachmentSchema,
]);

export const ClaimDataSchema = z.object({
  title: z.string(),
  fileNo: z.string(),
  estimatedRemainingTime: z.string(),
  currentStatus: z.string(),
  processDetails: z.array(ProcessDetailSchema),
});

export type ProcessDetailType = z.infer<typeof ProcessDetailSchema>;
export type ClaimDataType = z.infer<typeof ClaimDataSchema>;