export const exportToCSV = (data: any[], filename: string) => {
  // Convert data to CSV format
  const csvContent = [
    // Headers
    Object.keys(data[0]).join(','),
    // Data rows
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};