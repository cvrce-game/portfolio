import * as XLSX from 'xlsx';

export const readExcelData = async (url, sheetName) => {
    try {
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();

        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheet = workbook.Sheets[sheetName];

        let rows;
        if (!sheet) {
            console.error(`Sheet "${sheetName}" not found. Falling back to the first sheet.`);
            const firstSheetName = workbook.SheetNames[0];
            rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
        } else {
            rows = XLSX.utils.sheet_to_json(sheet);
        }
        return rows;
    } catch (error) {
        console.error('Error reading data from drive:', error);
        return [];
    }
};

export const excelDateToJSDate = (excelDate) => {
    const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
    return date.toLocaleDateString();
}

export function calculateFromString(dateStr) {
  const [monthStr, yearStr] = dateStr.split(" ");
  const monthMap = {
    Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6,
    Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12
  };
  return calculateDuration(monthMap[monthStr], Number(yearStr));
}

function calculateDuration(startMonth, startYear) {
  const startDate = new Date(startYear, startMonth - 1);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} yr ${months} mos`;
}
