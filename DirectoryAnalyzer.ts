import * as fs from "fs";
import * as path from "path";
import { DirectoryReport } from "./DirectoryReport";

export class DirectoryAnalyzer {
    public analyze(dirPath: string): DirectoryReport {
        const report: DirectoryReport = {
            files: 0,
            directories: 0,
            totalSize: 0,
            extensions: {}
        };

        const traverseDirectory = (currentPath: string) => {
            const items = fs.readdirSync(currentPath);

            for (const item of items) {
                const itemPath = path.join(currentPath, item);
                const stats = fs.statSync(itemPath); //метадані про файл/папку

                if (stats.isDirectory()) {
                    report.directories++;
                    traverseDirectory(itemPath);
                } else
                    if (stats.isFile()) {
                    report.files++;
                    report.totalSize += stats.size;

                    const ext = path.extname(item).toLowerCase();

                    if (!report.extensions[ext]) {
                        report.extensions[ext] = 0;
                    }
                    report.extensions[ext]++;
                }
            }
        };

        traverseDirectory(dirPath);
        return report;
    }
}
