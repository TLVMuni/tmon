interface ICamera {
    id: string
    name: string
}

declare module "*.png" {
    const value: any;
    export = value;
 }
