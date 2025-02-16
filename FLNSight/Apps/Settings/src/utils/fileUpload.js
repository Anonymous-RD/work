  
  export const readFile = (file, callback) => {
    if (!file) {
      throw new Error("No file provided.");
    }
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const fileContent = e.target.result;
      callback(fileContent);
    };
  
    reader.onerror = () => {
      throw new Error("Error reading file.");
    };
  
    reader.readAsText(file);
  };
  