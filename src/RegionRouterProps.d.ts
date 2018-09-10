import {RouteComponentProps} from "react-router";

interface RegionRouterProps {
    regionId: number
};

interface RegionProps extends RouteComponentProps<RegionRouterProps>{
}

export default RegionProps;