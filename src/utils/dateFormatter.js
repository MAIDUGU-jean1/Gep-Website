// utils/dateFormatter.js
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get day with ordinal suffix
    const day = date.getDate();
    const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' : 
                              day % 10 === 2 && day !== 12 ? 'nd' : 
                              day % 10 === 3 && day !== 13 ? 'rd' : 'th');
  
    // Month names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
  
    // Year
    const year = date.getFullYear();
  
    // Time in 12-hour format
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${dayWithSuffix} ${month} ${year} ${hours}:${minutes} ${ampm}`;
  };