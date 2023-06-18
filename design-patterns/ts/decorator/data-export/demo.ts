// demo.ts

import CsvDataExportDecorator from "./csv-data-export-decoraor";
import ExcelDataExportDecorator from "./excel-data-export-decorator";
import JsonDataExportDecorator from "./json-data-export-decorator";
import SimpleDataExport from "./simple-data-export";

const csvDataExport = new CsvDataExportDecorator(new SimpleDataExport());
csvDataExport.processData();

const excelDataExport = new ExcelDataExportDecorator(new SimpleDataExport());
excelDataExport.processData();

const jsonDataExport = new JsonDataExportDecorator(new SimpleDataExport());
jsonDataExport.processData();
