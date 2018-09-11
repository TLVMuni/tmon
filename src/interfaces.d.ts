interface ILocation {
    lat: number,
    lon: number
}
interface ICamera {
    id: number
    name: string,
    lat: number,
    lon: number
}

interface IRegion {
    id: number,
    center: ILocation,
    cameras: Array<ICamera>
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
