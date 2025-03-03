export type Company = {
 companyName?: string | null;
 companyId?: string | null;
 // image?: string | null;
 image?: string | { asset: { _ref: string }} | null;
}