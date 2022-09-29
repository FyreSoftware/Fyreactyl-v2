export interface EggSettings {
  id: string;
  nestId?: string;
  name?: string;
}
export interface NodeSettings {
  id: string;
  name: string;
}
export interface PackageSettings {
  id: number;
  name: string;
  disk: number;
  memory: number;
  cpu: number;
  servers: number;
  price?: string;
  buyable?: boolean
}
