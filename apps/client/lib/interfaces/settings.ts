export interface AddPackagePayload {
  name: string;
  disk: number;
  memory: number;
  cpu: number;
  servers: number;
  price?: string;
  buyable?: boolean
}
export interface EditPackagePayload {
  name: string;
  disk?: number;
  memory?: number;
  cpu?: number;
  servers?: number;
  price?: string;
  buyable?: boolean
}
