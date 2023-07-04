// demo.ts

import CeoInterview from "./ceo-interview";
import HrInterview from "./hr-interview";
import PhoneInterview from "./phone-interview";
import TechnicalInterview from "./technical-interview";

const interviews = new PhoneInterview(new TechnicalInterview(new HrInterview(new CeoInterview(null))));

interviews.execute();