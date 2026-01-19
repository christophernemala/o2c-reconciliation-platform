# 💼 O2C Reconciliation Platform

An automated tool for reconciling Accounts Receivable (AR) with Bank Statements. This platform helps you match invoices with bank payments quickly and accurately.

## 🚀 Live Platform

**🌐 Access the platform here:** https://christophernemala.github.io/o2c-reconciliation-platform/

**🧪 Test page:** https://christophernemala.github.io/o2c-reconciliation-platform/test.html

---

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| [🎓 Beginner's Guide](BEGINNERS_GUIDE.md) | Learn coding basics and understand the code |
| [📊 Sample Data Guide](SAMPLE_DATA_GUIDE.md) | Create test Excel files and learn data format |
| [🔧 Troubleshooting](TROUBLESHOOTING.md) | Fix common issues and errors |

---

## 🌟 What Does This Do?

This tool helps you:
- ✅ **Upload** AR and Bank statement Excel files
- ✅ **Automatically match** records based on customer name, amount, and date
- ✅ **Identify** unmatched records that need attention
- ✅ **Export** results to Excel for further analysis
- ✅ **Calculate** aging for overdue invoices

---

## 🚀 Quick Start (3 Steps)

### Step 1: Prepare Your Excel Files

**AR File should have these columns:**
- Customer Name
- Amount
- Invoice Number
- Date

**Bank File should have these columns:**
- Customer Name
- Amount
- Reference
- Date

📖 **Need sample files?** See [Sample Data Guide](SAMPLE_DATA_GUIDE.md)

### Step 2: Upload and Process

1. Go to https://christophernemala.github.io/o2c-reconciliation-platform/
2. Click "Upload AR File" and select your AR Excel file
3. Click "Upload Bank File" and select your Bank Excel file
4. Click "🚀 Process Reconciliation"

### Step 3: Review and Export

The platform will show you:
- ✅ **Matched Records**: Successfully reconciled transactions
- ⚠️ **Unmatched AR**: Invoices without matching bank payments
- ⚠️ **Unmatched Bank**: Bank payments without matching invoices

Click "📥 Export to Excel" to download results.

---

## 📁 Project Structure

```
o2c-reconciliation-platform/
│
├── index.html              # Main webpage (structure)
├── styles.css              # Styling (colors, layout, design)
├── app.js                  # Logic (file processing, matching, calculations)
├── test.html               # System test page
│
├── README.md               # This file (main documentation)
├── BEGINNERS_GUIDE.md      # Learning guide for beginners
├── SAMPLE_DATA_GUIDE.md    # How to create test data
└── TROUBLESHOOTING.md      # Fix common problems
```

---

## 🎯 How It Works

### Matching Algorithm

The platform matches AR and Bank records when:

1. **Customer Names Match** (case-insensitive)
   - "ABC Corp" = "abc corp" ✅
   - "ABC Corp" ≠ "ABC Corporation" ❌

2. **Amounts Match** (within 1 cent tolerance)
   - $1000.00 = $1000.01 ✅
   - $1000.00 ≠ $1000.50 ❌

3. **Dates Are Close** (within 7 days)
   - Jan 10 and Jan 15 ✅
   - Jan 10 and Jan 25 ❌

### Processing Flow

```
Upload Files → Read Excel → Normalize Data → Match Records → Display Results → Export
```

---

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6+)** - Logic and processing
- **SheetJS (XLSX)** - Excel file reading/writing
- **GitHub Pages** - Hosting

### Browser Support
- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari

### File Requirements
- Format: `.xlsx` or `.xls`
- Max size: 10MB recommended
- Encoding: UTF-8

---

## 🎓 For Beginners - Learning Path

### Week 1: Understanding
1. Read [Beginner's Guide](BEGINNERS_GUIDE.md)
2. Open each file and read comments
3. Try to understand what each section does

### Week 2: Experimenting
1. Change colors in `styles.css`
2. Modify text in `index.html`
3. Adjust matching rules in `app.js`

### Week 3: Learning
1. Take course: https://www.freecodecamp.org/
2. Watch: "JavaScript for Beginners" on YouTube
3. Practice on: https://www.codecademy.com/

### Week 4: Building
1. Add new features
2. Customize for your needs
3. Share your improvements

---

## 🛠️ How to Set Up GitHub Copilot (Optional)

GitHub Copilot is an AI coding assistant. Here's how to get it:

### Step 1: Subscribe
1. Go to https://github.com/features/copilot
2. Start free trial or buy ($10/month)

### Step 2: Install VS Code
1. Download from https://code.visualstudio.com/
2. Install on your computer

### Step 3: Add Copilot Extension
1. Open VS Code
2. Click Extensions (left sidebar)
3. Search "GitHub Copilot"
4. Install and sign in

### Step 4: Use It
- Type code and get suggestions
- Write comments, get code
- Press Tab to accept

---

## 🐛 Troubleshooting

### Platform won't load?
- Check URL is correct
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser

### Files won't upload?
- Check file format (.xlsx or .xls)
- Verify column names match requirements
- Try smaller test files first

### No matches found?
- Customer names must match exactly
- Check amounts are within 1 cent
- Verify dates are within 7 days

📖 **More help:** See [Troubleshooting Guide](TROUBLESHOOTING.md)

---

## 📊 Sample Data

Want to test the platform? Create these Excel files:

**AR_Sample.xlsx:**
```
Customer Name | Amount  | Invoice Number | Date
ABC Corp      | 5000.00 | INV-001       | 2026-01-10
XYZ Ltd       | 3500.50 | INV-002       | 2026-01-12
```

**Bank_Sample.xlsx:**
```
Customer Name | Amount  | Reference     | Date
ABC Corp      | 5000.00 | BANK-REF-001  | 2026-01-11
XYZ Ltd       | 3500.50 | BANK-REF-002  | 2026-01-13
```

📖 **Full guide:** See [Sample Data Guide](SAMPLE_DATA_GUIDE.md)

---

## 🚀 Deployment Status

✅ **Platform is LIVE and WORKING**

- Main Platform: https://christophernemala.github.io/o2c-reconciliation-platform/
- Test Page: https://christophernemala.github.io/o2c-reconciliation-platform/test.html
- All files deployed successfully
- GitHub Pages enabled
- All tests passing

---

## 📞 Support

### Documentation
- [Beginner's Guide](BEGINNERS_GUIDE.md) - Learn the code
- [Sample Data Guide](SAMPLE_DATA_GUIDE.md) - Create test files
- [Troubleshooting](TROUBLESHOOTING.md) - Fix issues

### Contact
- **Email:** christophernemala@gmail.com
- **GitHub Issues:** Report bugs or request features
- **GitHub Repo:** https://github.com/christophernemala/o2c-reconciliation-platform

### Learning Resources
- **freeCodeCamp:** https://www.freecodecamp.org/
- **MDN Web Docs:** https://developer.mozilla.org/
- **W3Schools:** https://www.w3schools.com/

---

## 📄 License

Free to use and modify for your needs.

---

## 🎉 Quick Links

| Link | Purpose |
|------|---------|
| [🌐 Live Platform](https://christophernemala.github.io/o2c-reconciliation-platform/) | Use the tool |
| [🧪 Test Page](https://christophernemala.github.io/o2c-reconciliation-platform/test.html) | Verify it works |
| [🎓 Learn](BEGINNERS_GUIDE.md) | Understand the code |
| [📊 Sample Data](SAMPLE_DATA_GUIDE.md) | Create test files |
| [🔧 Fix Issues](TROUBLESHOOTING.md) | Solve problems |

---

**Made with ❤️ for learning and automation**

*Remember: Everyone starts as a beginner. Keep learning, keep coding!* 🚀

---

## ⭐ Features

- ✨ Beautiful, modern UI with gradients
- 📱 Responsive design (works on mobile)
- ⚡ Fast processing with client-side logic
- 🔒 Secure (no data sent to servers)
- 💾 Export results to Excel
- 📊 Visual statistics and charts
- 🎨 Color-coded status badges
- 📈 Aging calculation for overdue invoices
- 🔍 Detailed reconciliation reports

---

## 🔄 Updates

**Latest Version:** 2.0 (January 2026)

**Recent Changes:**
- ✅ Split code into separate files (HTML, CSS, JS)
- ✅ Added comprehensive comments
- ✅ Created beginner's guide
- ✅ Added sample data guide
- ✅ Created troubleshooting guide
- ✅ Added test page
- ✅ Improved error handling
- ✅ Enhanced documentation

---

**🎯 Ready to start? Visit the platform now!**

👉 https://christophernemala.github.io/o2c-reconciliation-platform/
