import {ReportManager} from "./ReportManager";

const targetPath = process.argv[2] || '.';
const format = process.argv[3] || 'xml';

const reportManager = new ReportManager(format);
reportManager.generateReport(targetPath);
