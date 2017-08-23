import { district } from "./district";
import { applicationStatus } from "./applicationStatus";

export class Application {
    applicationId: number;
    address: string;
    districtId: number;
    applicationStatusId: number;
    district: district;
    applicationStatus: applicationStatus;
   // districtName:string;
   // statusName:string;
    constructor() {
       // super();
       // console.log(this.address);
        
    }
    /**
     *
     */

 /*    constructor(applicationId: number, address: string, districtId: number, applicationStatusId: number, district: district, applicationStatus: applicationStatus) {
        this.applicationId = applicationId;
        this.address = address;
        this.applicationStatus = applicationStatus;
        this.districtId = districtId;
        this.district = district;
    } */
}