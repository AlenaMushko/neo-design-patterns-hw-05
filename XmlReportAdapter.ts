import { XMLBuilder } from "fast-xml-parser";

import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "./DirectoryReport";

export class XmlReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
        const builder = new XMLBuilder({
            ignoreAttributes: false,
            format: true,
        });

        const obj = {
            report: {
                files: report.files,
                directories: report.directories,
                totalSize: report.totalSize,
                extensions: {
                    extension: Object.entries(report.extensions).map(([ext, count]) => ({
                        '@_name': ext,
                        '@_count': count
                    }))
                }
            }
        };

        const xmlBody = builder.build(obj);
        const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
        const xml = xmlDeclaration + xmlBody;

        return xml;
    }
}
