export const processCSV = (csvText, requiredFields) => {
    const rows = csvText
      .split("\n")
      .map((row) => row.trim())
      .filter((row) => row !== "");
  
    if (rows.length < 2) throw new Error("CSV file is empty or invalid.");
  
    const headers = rows[0]
      .split(",")
      .map((header) => header.trim().toLowerCase());
  
    const missingFields = requiredFields
      .map((field) => field.toLowerCase())
      .filter((field) => !headers.includes(field));
  
    if (missingFields.length > 0) {
      throw new Error(
        `The following required fields are missing: ${missingFields.join(", ")}`
      );
    }
  
    const dataRows = rows.slice(1).map((row, rowIndex) => {
      const columns = [];
      let current = "";
      let insideQuotes = false;
  
      for (const char of row) {
        if (char === '"') {
          insideQuotes = !insideQuotes;
          current += char;
        } else if (char === "," && !insideQuotes) {
          columns.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      columns.push(current.trim()); // Add the last column
  
      if (columns.length !== headers.length) {
        console.warn(
          `Row ${rowIndex + 1} has a column mismatch. Expected ${headers.length} columns but got ${columns.length}. Skipping this row.`
        );
        return null; // Skip problematic rows
      }
  
      const user = {};
      columns.forEach((col, index) => {
        const header = headers[index];
        try {
          if (col.startsWith("{") && col.endsWith("}")) {
            // Parse the JSON after unescaping it
            const cleanedCol = col
              .replace(/""/g, '"') // Replace double double-quotes with single double-quotes
              .replace(/^"|"$/g, ""); // Remove surrounding quotes
            user[header] = JSON.parse(cleanedCol);
          } else {
            user[header] = col.replace(/^"|"$/g, ""); // Clean normal string fields
          }
        } catch (error) {
          console.error(
            `Error parsing JSON in column "${header}" at row ${rowIndex + 1}:`,
            col,
            error
          );
          user[header] = col; // Fallback to raw value
        }
      });
  
      return user;
    });
  
    return { headers, dataRows: dataRows.filter(Boolean) }; // Remove null rows
  };
  