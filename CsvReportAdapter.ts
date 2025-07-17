import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "./DirectoryReport";

export class CsvReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
        const headerMetrics = 'Metric,Value';
        const rowsMetrics =
            `Total Files,${report.files}\n` +
            `Total Directories,${report.directories}\n` +
            `Total Size (bytes),${report.totalSize}`;

        const headerExtensions = 'Extension,Count';
        const rowsExtensions = Object.entries(report.extensions)
            .map(([ext, count]) => `${ext},${count}`)
            .join('\n');

        return [
            headerMetrics,
            rowsMetrics,
            '',
            headerExtensions,
            rowsExtensions
        ].join('\n');
    }
}
