interface ICamera {
    id: number
    name: string,
    lat: number,
    lon: number
}

interface CameraViewProps {
    cameraId: number
}

interface FooterState {
    activeCameraId: number
}

declare module "*.png" {
    const value: any;
    export = value;
 }
