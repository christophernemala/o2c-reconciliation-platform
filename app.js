// O2C Reconciliation Platform - Main Application Logic
// This file handles Excel file processing, data matching, and reconciliation

// ============================================
// GLOBAL VARIABLES
// ============================================
let arData = [];      // Stores AR (Accounts Receivable) data from Excel
let bankData = [];    // Stores Bank statement data from Excel
let matchedRecords = [];    // Stores successfully matched records
let unmatchedAR = [];       // Stores unmatched AR records
let unmatchedBank = [];     // Stores unmatched Bank records

// ============================================
// EXCEL FILE PROCESSING
// ============================================

/**
 * Reads an Excel file and converts it to JSON format
 * @param {File} file - The Excel file to read
 * @returns {Promise<Array>} - Array of row objects
 */
function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                // Read the file as binary string
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                // Get the first sheet
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                
                // Convert sheet to JSON
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { 
                    raw: false,  // Keep formatting
                    defval: ''   // Default value for empty cells
                });
                
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = function(error) {
            reject(error);
        };
        
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Normalizes column names by removing spaces and converting to lowercase
 * This helps match columns even if they have different formatting
 */
function normalizeHeaders(data) {
    return data.map(row => {
        const normalizedRow = {};
        for (let key in row) {
            // Convert "Customer Name" to "customername"
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
            normalizedRow[normalizedKey] = row[key];
        }
        return normalizedRow;
    });
}

/**
 * Parses amount strings and converts them to numbers
 * Handles formats like: "$1,234.56", "1234.56", "(1234.56)" for negatives
 */
function parseAmount(value) {
    if (!value) return 0;
    
    // Convert to string and remove currency symbols, commas
    let cleanValue = String(value).replace(/[$,]/g, '');
    
    // Handle negative numbers in parentheses: (1234.56) -> -1234.56
    if (cleanValue.includes('(') && cleanValue.includes(')')) {
        cleanValue = '-' + cleanValue.replace(/[()]/g, '');
    }
    
    return parseFloat(cleanValue) || 0;
}

/**
 * Parses date strings into Date objects
 * Handles multiple date formats
 */
function parseDate(value) {
    if (!value) return null;
    
    // Try to parse the date
    const date = new Date(value);
    
    // Check if valid date
    if (isNaN(date.getTime())) {
        return null;
    }
    
    return date;
}

// ============================================
// RECONCILIATION LOGIC
// ============================================

/**
 * Main reconciliation function
 * Matches AR records with Bank records based on:
 * 1. Customer Name
 * 2. Amount (within tolerance)
 * 3. Date proximity (within 7 days)
 */
function performReconciliation() {
    matchedRecords = [];
    unmatchedAR = [...arData];
    unmatchedBank = [...bankData];
    
    // Amount tolerance for matching (e.g., 0.01 = 1 cent difference allowed)
    const amountTolerance = 0.01;
    
    // Date tolerance in days
    const dateTolerance = 7;
    
    // Try to match each AR record with Bank records
    for (let i = 0; i < arData.length; i++) {
        const arRecord = arData[i];
        
        // Look for matching bank record
        for (let j = 0; j < bankData.length; j++) {
            const bankRecord = bankData[j];
            
            // Skip if already matched
            if (bankRecord.matched) continue;
            
            // Check if amounts match (within tolerance)
            const amountMatch = Math.abs(
                parseAmount(arRecord.amount) - parseAmount(bankRecord.amount)
            ) <= amountTolerance;
            
            // Check if customer names match (case-insensitive)
            const customerMatch = arRecord.customername && bankRecord.customername &&
                arRecord.customername.toLowerCase().trim() === 
                bankRecord.customername.toLowerCase().trim();
            
            // Check if dates are close (within tolerance)
            let dateMatch = true;
            if (arRecord.date && bankRecord.date) {
                const arDate = parseDate(arRecord.date);
                const bankDate = parseDate(bankRecord.date);
                
                if (arDate && bankDate) {
                    const daysDiff = Math.abs(
                        (arDate - bankDate) / (1000 * 60 * 60 * 24)
                    );
                    dateMatch = daysDiff <= dateTolerance;
                }
            }
            
            // If all criteria match, create a matched record
            if (amountMatch && customerMatch && dateMatch) {
                matchedRecords.push({
                    arRecord: arRecord,
                    bankRecord: bankRecord,
                    matchDate: new Date().toLocaleDateString()
                });
                
                // Mark as matched
                bankRecord.matched = true;
                unmatchedAR.splice(i, 1);
                i--; // Adjust index after removal
                break; // Move to next AR record
            }
        }
    }
    
    // Remove matched bank records from unmatched list
    unmatchedBank = unmatchedBank.filter(record => !record.matched);
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

/**
 * Updates the statistics cards with reconciliation results
 */
function updateStats() {
    document.getElementById('totalAR').textContent = arData.length;
    document.getElementById('totalBank').textContent = bankData.length;
    document.getElementById('matchedCount').textContent = matchedRecords.length;
    document.getElementById('unmatchedCount').textContent = 
        unmatchedAR.length + unmatchedBank.length;
}

/**
 * Displays matched records in a table
 */
function displayMatchedRecords() {
    const tbody = document.getElementById('matchedTableBody');
    tbody.innerHTML = '';
    
    matchedRecords.forEach((match, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${match.arRecord.customername || 'N/A'}</td>
            <td>$${parseAmount(match.arRecord.amount).toFixed(2)}</td>
            <td>${match.arRecord.invoicenumber || 'N/A'}</td>
            <td>${match.bankRecord.reference || 'N/A'}</td>
            <td>${match.arRecord.date || 'N/A'}</td>
            <td><span class="status-badge status-matched">Matched</span></td>
        `;
    });
}

/**
 * Displays unmatched AR records in a table
 */
function displayUnmatchedAR() {
    const tbody = document.getElementById('unmatchedARBody');
    tbody.innerHTML = '';
    
    unmatchedAR.forEach((record, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${record.customername || 'N/A'}</td>
            <td>$${parseAmount(record.amount).toFixed(2)}</td>
            <td>${record.invoicenumber || 'N/A'}</td>
            <td>${record.date || 'N/A'}</td>
            <td>${calculateAging(record.date)}</td>
            <td><span class="status-badge status-unmatched">Unmatched</span></td>
        `;
    });
}

/**
 * Displays unmatched Bank records in a table
 */
function displayUnmatchedBank() {
    const tbody = document.getElementById('unmatchedBankBody');
    tbody.innerHTML = '';
    
    unmatchedBank.forEach((record, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${record.customername || 'N/A'}</td>
            <td>$${parseAmount(record.amount).toFixed(2)}</td>
            <td>${record.reference || 'N/A'}</td>
            <td>${record.date || 'N/A'}</td>
            <td><span class="status-badge status-unmatched">Unmatched</span></td>
        `;
    });
}

/**
 * Calculates aging (days overdue) for a given date
 */
function calculateAging(dateString) {
    if (!dateString) return 'N/A';
    
    const date = parseDate(dateString);
    if (!date) return 'N/A';
    
    const today = new Date();
    const daysDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return '0 days';
    if (daysDiff === 0) return 'Today';
    if (daysDiff === 1) return '1 day';
    
    return `${daysDiff} days`;
}

// ============================================
// EXPORT FUNCTIONALITY
// ============================================

/**
 * Exports reconciliation results to Excel file
 */
function exportToExcel() {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Create Matched Records sheet
    const matchedSheet = XLSX.utils.json_to_sheet(
        matchedRecords.map(m => ({
            'Customer Name': m.arRecord.customername,
            'Amount': parseAmount(m.arRecord.amount),
            'AR Invoice': m.arRecord.invoicenumber,
            'Bank Reference': m.bankRecord.reference,
            'AR Date': m.arRecord.date,
            'Bank Date': m.bankRecord.date,
            'Status': 'Matched'
        }))
    );
    XLSX.utils.book_append_sheet(wb, matchedSheet, 'Matched Records');
    
    // Create Unmatched AR sheet
    const unmatchedARSheet = XLSX.utils.json_to_sheet(
        unmatchedAR.map(r => ({
            'Customer Name': r.customername,
            'Amount': parseAmount(r.amount),
            'Invoice Number': r.invoicenumber,
            'Date': r.date,
            'Aging': calculateAging(r.date),
            'Status': 'Unmatched'
        }))
    );
    XLSX.utils.book_append_sheet(wb, unmatchedARSheet, 'Unmatched AR');
    
    // Create Unmatched Bank sheet
    const unmatchedBankSheet = XLSX.utils.json_to_sheet(
        unmatchedBank.map(r => ({
            'Customer Name': r.customername,
            'Amount': parseAmount(r.amount),
            'Reference': r.reference,
            'Date': r.date,
            'Status': 'Unmatched'
        }))
    );
    XLSX.utils.book_append_sheet(wb, unmatchedBankSheet, 'Unmatched Bank');
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `Reconciliation_Report_${timestamp}.xlsx`;
    
    // Download the file
    XLSX.writeFile(wb, filename);
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Main function that runs when "Process Reconciliation" button is clicked
 */
async function processReconciliation() {
    // Get file inputs
    const arFile = document.getElementById('arFile').files[0];
    const bankFile = document.getElementById('bankFile').files[0];
    
    // Validate that both files are selected
    if (!arFile || !bankFile) {
        alert('Please select both AR and Bank files');
        return;
    }
    
    // Show loading spinner
    document.getElementById('loading').classList.add('active');
    document.getElementById('processBtn').disabled = true;
    
    try {
        // Read both Excel files
        const arRawData = await readExcelFile(arFile);
        const bankRawData = await readExcelFile(bankFile);
        
        // Normalize column headers
        arData = normalizeHeaders(arRawData);
        bankData = normalizeHeaders(bankRawData);
        
        // Perform reconciliation
        performReconciliation();
        
        // Update UI with results
        updateStats();
        displayMatchedRecords();
        displayUnmatchedAR();
        displayUnmatchedBank();
        
        // Show results section
        document.getElementById('resultsSection').classList.add('active');
        
        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
    } catch (error) {
        console.error('Error processing files:', error);
        alert('Error processing files. Please check the file format and try again.');
    } finally {
        // Hide loading spinner
        document.getElementById('loading').classList.remove('active');
        document.getElementById('processBtn').disabled = false;
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Wait for page to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Attach click handler to Process button
    document.getElementById('processBtn').addEventListener('click', processReconciliation);
    
    // Attach click handler to Export button
    document.getElementById('exportBtn').addEventListener('click', exportToExcel);
    
    console.log('O2C Reconciliation Platform initialized successfully');
});
