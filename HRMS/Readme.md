# HRMS - Requirements Document

## Table of Contents
1. [Introduction](#introduction)
2. [Requirement Overview](#requirement-overview)
3. [Module - Super Admin / Admin](#module---super-admin--admin)
4. [Module - User Login](#module---user-login)
5. [Statutory Compliances](#statutory-compliances)

---

## Introduction

HR Management System is a system commonly used by Companies which provides automated solution that aids in dealing with the complexities of human resource management.

---

## Requirement Overview

HRMS is a software solution that will provide the following:
- Employee Database
- Company Database
- Performance Report
- HR Process and Policy Integration that covers the complete lifecycle of an employee in the Company

---

## Module - Super Admin / Admin

### Admin Registration
- Setting up the main modules to be done by the Super Admin / Admin
- Super admin assigns an admin user; decides which fields the admin can edit

### Company Master

#### a. Company Profile
- **Type**: Main office, branch
- **Location**: Office / brand address
- **Contact Info**: Contact details

#### a.2 Department Structure
- Department
- Section
- Team

#### a.3 Shift Category

##### a.3.1 Type: Timing
- **Fixed**: Standard fixed hours
- **Rotational Shift**: Multiple shift patterns
- **Flexible**: Variable timing with fixed duration

##### a.3.2 Timing Examples
- Fixed: 8-6
- Rotational: 2-6, 6-10, 10-6
- Flexible: 9 hours (includes 1 hr lunch and coffee break)

*Note: Sample timings only, admin will determine the actual timings*

#### a.4 Calendar
- Company Holiday list
- Official company holiday list
- Company events

#### a.5 Employee Category
- **General 1**: Fixed weekly off Saturday and Sunday
- **General 2**: Fixed weekly off Sunday
- **Support**: Rotational weekly off
- **Housekeeping**: Rotational weekly off
- **General-flexi**: Fixed total number of working hours per week

*Category will define employee's eligibility for OT, OD, Leave type, Holiday*

### b. Hiring

#### b.1 Manpower Requirement Form

##### b.1.2 Request Form
- Date
- Requested by
- Requirement Date
- Designation
- No. of opening
- Job Description summary
- Education
- Experience (preferred no. of years, preferred designation/industry)
- Gender
- Age Bracket
- Salary bracket
- Expected joining date
- Technical Interviewer (manager can assign a person who will handle the technical interview)

##### b.1.3 HR Notification and Super Admin Approval
- Admin and super admin will see a notification in their user page
- Admin will approve the requirement, estimated TAT and assign it to a recruiter
- Once assigned, a notification will be sent to the person who made the manpower request with the estimated TAT
- From then onwards, the requester will be able to see the progress of the requirement

##### b.1.4 Requirement Form - Part 2: HR Fulfillment Form
- Job Description (full description made by the HR)
- All other details approved or corrected by the HR
- Action plan & execution
- Estimated TAT
- Interview Process

##### b.1.5 Evaluation

###### b.1.5.1 Applicant DB
- Entering all applicants
- Status (shortlisted, rejected)
- Status remarks (why it is rejected, other remarks)
- Source (how or where the profiles are taken from)

###### b.1.5.2 Evaluation Form
- Shortlisted candidates
- Interview schedule
- Round 1 - test, round 2 - HR interview, etc.
- Application form
- Test type and results
- HR interview result
- Technical interview result
- Final result
- Salary offered

###### b.1.5.3 Hired Candidates
- Final selection records

###### b.1.5.4 Comprehensive Report
Admin should be able to see the list of candidates shortlisted and rejected, with all details from shortlisting to hiring.

##### b.1.6 Pre Hiring

###### b.1.6.1 Checklist (Pre Hiring checklist)
- Offer letter: date sent, status, date received
- KYE form: format (can be downloaded by the admin), date sent, status, date received

###### b.1.6.2 Upload Documents
Document management for pre-hiring process

### c. Joining - Onboarding Requirements

#### Checklist (Requirement docs list)
- Joining date
- Documents received
- Documents provided
- Documents status (e.g., offer letter - pending/completed)
- PF Registration form
- ESIC Registration form
- Bank opening form
- Upload documents

### d. Training

#### Training Form
- Modules, duration, result
- Trainer, final result
- HRD approval
- Trainer has to identify the passing marks % of training result

#### Training List
- List of existing training which the user can see (only based on his department)
- Option to create custom training or use existing training

### e. Employee Evaluation

#### Employee Evaluation Form Types:
1. **New Joinee**: Training result, performance evaluation form, evaluation result, recommendation (for confirmation, for termination)
2. **Regular Employee**: Performance evaluation form, evaluation result, recommendation (appraisal/promotion, termination, probation)
3. **Probation (under performance)**: For employees who are rated as under performers where they are given a specified time period to improve and re-evaluated

### f. Exit

#### f.1 Exit Form
- Resignation letter
- Resignation acceptance
- Notice period
- Date of resignation
- Actual last day of work
- Work transfer
- Employee gets an update when resignation is accepted and notice period start and end date

#### f.2 NOC (No Objection Certificate)
- Asset/inventory clearance
- Work transfer
- Clearance from Dept head
- Finance/Accounts clearance
- HR clearance

#### f.3 Upload Documents
Exit-related document management

#### f.4 Full and Final Settlement
- Computation generated by the system
- Admin should be able to add/revise it
- Super admin approval required

#### f.5 Eligibility for Gratuity and Computation
Will be covered in section on Statutory Compliances

### g. Salary Master

#### g.1 Salary Structure

##### Basic Components and Calculation:
- **Basic**: 
  - CTC * 60% (CTC <= 20000)
  - CTC * 40% (CTC > 20000)
- **HRA**: 
  - Basic * 50% (default option)
  - Basic * % (admin should have an option to change the %)
- **Allowances**: Various allowances as defined by admin
- **Variable**: Can be a set % of the CTC or any other amount; inclusive of the CTC

##### Statutory Deductions:
- **PF Employee**: Basic * 12%
- **PF Employer**: Basic * 12%
- **ESI Employee**: CTC * % (as set by admin)
- **ESI Employer**: CTC * % (as set by admin)

*Note: PF and ESI calculation changes from time to time, so admin should be able to change it anytime within a financial year*

#### g.2 Salary Slip

##### Sample Format:
```
Salary Month: Mar 2017
Employee ID: b1111          Date of Joining: 1-Aug-07
Name: Don Juan                  UAN: [UAN Number]
Designation: Training Specialist E.S.I. NO.: [ESI Number]

EARNINGS                Amount Rs.    DEDUCTIONS           Amount Rs.
Basic                   10,500.00     Bank Loan            0.00
HRA                     5,250.00      Advance              0.00
Medical                 1,250.00      Penalties            0.00
Variable                0.00          Absenteeism          0.00
Extra Earned Wages      0.00          Late Comings         0.00
TDS deduction           0.00          TDS deduction        0.00
Daily Allowance         0.00          Miscellaneous        0.00
Conveyance             1,600.00       Other Penalties      0.00
Driver                  0.00          Other Deduction      0.00
Telephone              1,000.00       
Travel Allowance       3,000.00       
Entertainment          5,000.00       
Child/Education          200.00       
Lunch & Refreshment      950.00       
Miscellaneous            0.00         
LTA                      0.00         Total Rs.            0.00
Incentives               0.00         Provident Fund (employer) 0.00
Gratuity                 0.00         ESIC (employer)      0.00
Training Allowance       0.00         Provident Fund (employee) 0.00
Uniform Allowances       0.00         ESIC (employee)      0.00
Books & Periodicals      0.00         
CCA                      0.00         

Total Earnings Rs.      28,750.00     Total Rs.            0.00

Gross Pay (Cost to the Company): 35000
Net Pay (In Hand Salary): [Calculated Amount]
```

#### g.3 Salary Report
Admin can generate and print monthly, annual salary report

#### g.4 Minimum Wage
Admin can set the minimum wage amount (gross salary) so that while entering a salary structure of an employee, admin can be reminded whether it meets minimum wage requirements.

---

## Employee Master

### a.1 General Info

#### a.1.1 Employee ID
**Sample employee id format:**
- g35089 - designated id of a Front Desk Executive
-  default value
- 1: department code
- g: section code
- 35: post code
- 89: employee number after the last person hired

##### Department Codes:
| Department | Code |
|------------|------|
| Admin | 1 |
| Development | 2 |
| Support | 3 |
| Marketing | 4 |
| Sales | 5 |
| Operations | 6 |

##### Section Codes:
| Section | Code | Department |
|---------|------|------------|
| Top Management | a | Admin |
| Human Resource | b | Admin |
| Finance | c | Admin |
| Inventory/IT Admin | d | Admin |
| Purchase | e | Admin |
| Admin | f | Admin |
| Front Desk | g | Admin |
| Housekeeping | h | Admin |
| Development | a | Development |
| R&D | b | Development |
| Testing/Training | c | Development |
| Support | a | Support |
| Delivery | b | Support |
| Business Development | a | Marketing |
| Online Marketing | b | Marketing |
| Events & Exhibits | c | Marketing |
| Tele-Marketing | d | Marketing |

##### Post Codes:
| Position | Code |
|----------|------|
| Director | 11 |
| CEO | 12 |
| COO | 13 |
| CFO | 14 |
| President | 21 |
| VP | 22 |
| AVP | 23 |
| GM | 24 |
| DGM | 25 |
| SM | 26 |
| M | 27 |
| PL | 32 |
| TL | 33 |
| Senior Executive | 34 |
| Executive | 35 |
| Associate | 36 |
| Consultant | 51 |
| Housekeeping | 91 |

#### a.1.2 Full Name
#### a.1.3 Department
#### a.1.4 Section/Team
#### a.1.5 Date of Joining
#### a.1.6 Status

##### Employee Status Types:
1. **Probation - new joinee**
2. **Probation - under performer**
3. **Regular**
4. **Trainee**
5. **Parttime**
6. **Consultant**
7. **Notice Period**
8. **Intern**
9. **Inactive**
10. **Contract**

*Status will define the eligibility of employee for leaves, OT, OD, PF/ESI*

#### a.1.7 Training
- Modules, date, result
- Duration, condition

#### a.1.8 Probation Period
- Entered by admin for new joinee
- Admin should get a reminder before the period is over
- Can be edited within the period
- History of changes of duration should be visible, along with remarks
- Changing the probation period should be approved by the super admin

#### a.1.9 Notice Period
- Entered by admin upon hiring
- Can be edited at any point during employment
- Changing the notice period should be approved by the super admin

#### a.1.10 Employee Category
E.g., general, support, housekeeping, etc.

#### a.1.11 Confirmation

##### 1. Reminder
- Highlights employees due for confirmation (probation period completion)
- Schedule reminder based on probation period
- Admin should see in calendar or reminder notifications when probation is almost due

##### 2. Confirmation Form
- Form sent to evaluator
- Contains result score and remarks/recommendation for confirmation
- Status: Admin to enter or update the confirmation status of the employee

### a.2 Personal Info

#### a.2.1 Date of Birth
- **Official DOB**: Based on birth certificate
- **Celebrated Birthdate**: Optional entry
- System sends birthday notification to admin for HR purposes
- Posted on individual user's main page

#### a.2.2 Gender
#### a.2.3 Marital Status
#### a.2.4 Contact Details
- Phone no., mobile no., alternate no.
- Email address
- Permanent address, current address

#### a.2.5 Blood Group
#### a.2.6 Emergency Contact Details
- Name, address, contact number, relationship

#### a.2.7 Family Details
- **Spouse**: Name, DOB, qualification/occupation
- **Father**: Name, DOB, qualification/occupation
- **Mother**: Name, DOB, qualification/occupation
- **Siblings**: Name, DOB, qualification/occupation

#### a.2.8 Qualification
#### a.2.9 Work History
#### a.2.10 Religion
#### a.2.11 PAN Card
#### a.2.12 Aadhar Card

### a.3 Document Upload
Document management with verification status

### a.4 Payroll Info

#### a.4.1 Bank Account
- Company salary account / personal account approved by admin

#### a.4.2 PF Registration

##### If continuing PF from previous employer:
- UAN, details

##### If new PF:
- Registration date, UAN, DOJ PF
- If voluntary PF, DOJ can be anytime within the tenure in the company

#### a.4.3 ESIC
- Registration date, ESIC no.
- ESI nominee removal (ESI contribution period has to be completed before removing a nominee)

### a.5 Salary

#### a.5.1 Salary Details
- **Earnings**: Various components as defined in salary master
- **Deductions**: Standard and custom deductions
- **Variable**: Type and percentage/amount

### a.6 Promotion / Appraisal

#### a.6.1 Designation
- Effectivity date

#### a.6.2 Team / Department Reassignment
- Effectivity date

#### a.6.3 Salary
- New salary details

### a.7 Upload Docs

#### a.7.1 Document Types:
1. **Education**: Degree cert, 12th, training, etc.
2. **Employment**: Work-related documents
3. **ID**: Aadhar, driver's license
4. **PAN Card**
5. **Others**

#### a.7.2 Verification Status
- Pending, complete-approved, complete-disputed, discrepancy found
- Once status is entered as complete, it cannot be changed without super admin approval

#### a.7.3 Uploaded by
- Admin, user (admin can give permission to user to upload the doc from the user login)

*All documents, once uploaded can be viewed by admin, but cannot be deleted other than by super admin*

#### a.8.4 Document Checklist Form

##### Hiring Docs:
- Application form, test & interview form, offer letter

##### Joining Docs:
- Appointment letter, COC, NDNCA

##### Confirmation:
- Confirmation form, confirmation letter

##### Appraisal, Promotion:
- Appraisal letter, promotion letter

### a.9 Exit

#### a.9.1 Process
- Resignation, acknowledgement, handover, NOC, exit docs, interview

#### a.9.2 Exit Types:

##### a.9.2.1 Resignation
Standard resignation process

##### a.9.2.2 Termination
Those who do not abide by the COC, commits acts of crime and any other such severe acts

##### a.9.2.3 Voluntary Resignation
Underperformers/failed during the training or probation period can be asked to resign voluntarily in lieu of termination

##### a.9.2.4 Voluntary Termination
Based on company discretion

#### a.9.3 Exit Documents
Upload documents

#### a.9.4 Exit Interview
Interview checklist and feedback

#### a.9.5 Update Status
Admin to enter the final day worked, system to close the status as resigned/terminated/voluntary resignation/voluntary termination

#### a.9.6 Attrition Chart
Based on the date/duration, type, reason

---

## b. Attendance

### b.1 Shift Category
E.g., General

### b.2 Shift
This will determine the working days and possible shift timing

### b.3 Policies

#### 1. Grace Period
The extra minutes given to employees, after the start of the shift, which will never be counted as late coming

#### 2. Tardiness

##### 2.1 ≤3 late instances
Late instances up to 3 times within a month is waived

##### 2.2 >3 late instances
Late instances more than 3 times within a month is calculated based on units

| Late coming (in minutes) | Units |
|-------------------------|-------|
| >15 mins to 30 mins | 1 unit |
| >30 mins to 45 mins | 2 units |

Whereas: 1 unit = 1/4 of 1 day

##### 2.3 Late coming > 45 mins
Tardiness of more than 45 minutes equals 1 full day deduction

##### 2.4 Tardiness Policy Application
- Applies to fixed, rotational, fixed-flexi shift
- Does not apply to fully flexible shift
- Does not apply for user login during weekly off or holiday

### b.4 User Attendance Log
Regular attendance tracking

### b.5 User Late Coming Waiver Request
- Can be used by the user to inform about special circumstances (flood, road accident, etc.)
- Sent to the Managing Head and admin (HR)
- Approved/rejected by both

### b.6 Attendance Manual Log
In case of technical issues, or any special circumstances, admin can manually log the attendance of a user.

---

## c. Leave

### c.1 Types

#### Leave Type Configuration
Admin to determine the types of leaves and number of leaves within a duration of time (per month, per year, etc.)

**Example:**
| Type | Code | Number of Leaves | Period | Emp. Status | Notification Period |
|------|------|------------------|--------|-------------|-------------------|
| Casual Leave | CL | 18 | 1.5 per month/18 per year | Regular | As per policy |
| Casual Leave | CL | 1 | 1 per month | Probation | As per policy |

*For newly regularized employees, the system should be able to compute the leaves based on the number of months remaining in the financial year*

### c.2 Policies

#### c.2.1 Notification Period
All leaves, except emergency leaves, have to be notified prior to the actual leave

#### c.2.2 Emergency Leave
Sub-type of CL/SL/FD wherein the employee can notify on the same day or 1 day prior

#### c.2.3 Short Leave
- Sub-type of CL/SL/FD and equivalent to 25% of 1 day leave
- Total number of hours worked must be minimum as per company policy

#### c.2.4 Employee under Probation
Only 1 SL per month can be taken; no CL

#### c.2.5 Employee under Notice Period
Only 1 SL per month can be taken; no CL

#### c.2.6 Earned Leave (EL)
- Balance CL/SL by the end of a Financial Period is converted to EL
- Max EL that can be accumulated to be determined by admin
- EL can be converted to pay-out or comp off for the next FY

#### c.2.7 Comp Off
OT submitted for comp off; if there is no OT submitted then Comp off cannot be applied by the employee

### c.3 Calculation

#### c.3.1 General Calculation
Any leave type and CL/SL less than 6 days
- Daily rate = (Fixed Basic Wage / number of days in a month excluding holidays) × number of leaves

#### c.3.2 Long Leave
Long leaves are CL/SL leaves in excess of 5 days
- Long Leave Calculation = (CTC / no. of days excluding holidays) × no. of leaves

#### c.3.3 Unapproved Leave
Leaves that are not approved are multiplied by 2

#### c.3.4 Leave Request Form

##### Form Details:
- Date applied (system generated)
- Date of Leave applying for
- Employee Status (system generated)
- Total number of days (system generated)
- Type of leave
- Reason for leave
- Type of Leaves balance, comp off balance (system generated)
- Request Validity
- MH approval/rejection
- MH remarks
- HR approval/rejection
- HR remarks

*Applicant can cancel the request or change the leave date being applied for (MH and HR will be notified)*

---

## d. Overtime

### d.1 Policies

#### d.1.1 Type
1. **OT for pay out**: % rating to be defined (e.g., regular day 100%, holiday 150%)
2. **OT for comp off**

#### d.1.2 Eligibility
Type of OT is based on the employee category (e.g., support is eligible for OT for both pay out and comp off)

#### d.1.3 Form
Form to be sent and approved by both MH and HR

##### Form Details (from MH):
- Date
- OT assigned by (system generated - will automatically show the MH name and designation)
- OT assigned to
- OT date and time
- Work assigned
- Remarks

##### Form Details (from Employee):
- Date
- Actual time from: to:
- Total duration (system generated)
- Status of work assigned - complete/incomplete
- OT type
- Remarks

##### Form Details (MH Approval):
- Date
- Work approval
- OT approval
- Remarks

---

## e. Outdoor Duty

### e.1 Process

#### e.1.1 Description
The employee may be assigned to the client site or to a location outside the office premises

#### e.1.2 Task designation/verification & form submission
Managing Head assigns the outdoor duty, notifying the employee through OD form and email/call/face to face

#### e.1.3 HR verification and allocation of allowance
HR checks and approves the outdoor duty and allocates appropriate allowance

### e.2 Travel Allowance
The approved amount that should be added to the Travel Allowance

### e.3 Form
OD form that can be initiated by either Managing Head or employee

#### Managing Head Form Details (task assignment):
- Date
- OD Date
- OD type: Local, outside NCR
- Time (may be a specific time or full day, half day)
- Site details: Company name, Location, Address (optional), Contact Person's details (optional)
- Task assigned
- Expected Task duration (no. of hrs or days the task is expected to be completed)
- Inventory details (hardware, items required to be brought by the employee for the task)
- Remarks

#### Employee Form Details:
- All above details already filled up by the MH
- Date
- Assignment confirmation
- Actual time worked (exclusive of travel time)
- Travel duration
- Transport mode
- Expense details
- Task Status
- Remarks

---

## f. Reimbursement

### f.1 Form
For any other expense not included in the OD expense

#### User Request Form:
- Date
- Type
- Detail
- Purpose
- Expense proof: receipt, no receipt, e-ticket, etc.
- Upload docs

#### MH Approval:
- Date
- Same details shown, against which MH approves or disapproves the expense
- Remarks

#### HR Approval/Confirmation:
- Date
- Documents received
- Documents approved
- Salary Month
- Remarks

*System adds the amount to the salary ONLY WHEN SUPER ADMIN APPROVES*

---

## g. Advance

### Advance Request Form:
- Date
- Type: salary advance
- Details: medical emergency of wife
- Amount
- Payment mode: bank transfer, cash, paytm, etc.
- Date requested
- Approved by
- Date released
- Salary month for deduction
- Deduction terms: in full, in parts (if in parts, how many months to deduct)

*System is supposed to add the deduction automatically as per the terms mentioned above*

---

## h. Bonus

### Bonus Details:
- Date
- Type
- Details
- Amount
- Remarks
- Disbursement type: in full, in parts
- Salary month: which month is it supposed to be added to
- Super Admin approval: without this, the bonus will not be added to the salary

---

## i. Variable

### i.1 KRA Rating
- KPI
- Total rating
- Calculated on 2 components: payable working days (unpaid/unapproved leaves are deducted) and KRA rating

### i.2 Variable Type
Performance based variable, company success variable

#### i.2.1 Variable %
Variable can be a % of a salary component or CTC, or it can also be a fixed amount regardless of the CTC
E.g., 10% of CTC

#### i.2.2 Variable Amount
1. System generated once variable % is entered
2. Fixed amount regardless of CTC or any other salary component

#### i.2.3 Sample Computation:
```
CTC: 50000
Variable %: 10%
Variable amt: 5000
For April, employee gets the following:
KRA rating: 80%
Variable based on KRA %: 80% × 5000 = 4000
Unpaid leaves: 2
Variable deduction: (5000/no. of days in a month excluding holidays) × 2
TOTAL VARIABLE AMT FOR APRIL: 4000 - variable deduction
```

---

## Statutory Compliances

### a. PF (Provident Fund)

#### a.1 Employee's Share

| Conditions | Amount | Rating/Amt | Computation |
|------------|--------|------------|-------------|
| Fixed basic ≤ 15000 | 12% | 12% × fixed basic |
| Fixed basic > 15000 | 1800 | 1800 |

*Admin should be able to change any of these, as per the changes in PF rules*

#### a.1.2 Employer's Share

##### a.1.2.1 Components:
- **EPF**: 3.67%
- **EPS**: 8.33%
- **EDLI**: 0.50%
- **Admin charges**: 0.50%

*Admin should be able to change any of these, as per the changes in PF rules*

#### a.1.3 PF Nominees
Employees who are nominated for PF

##### Details:
- Date of registration: for voluntary PF, date of registration can be anytime during employment
- Date of exit: system generated (when employee leaves the company)
- UAN
- Registered by: who exactly registered the employee in the PF site

##### Type of PF Nominees:
- **Required - voluntary**: above 15000
- **Continued PF** (after previous employment)
- **Required - continued PF** (new joinee)
- **Voluntary - continued PF** (new joinee)

#### a.1.4 Report
Report containing details for generating challan
- PF report (cumulative - monthly, annually; individual list)

### b. ESIC

#### b.1 Employee's Share

| Conditions | ESI % |
|------------|-------|
| Gross salary > 21000 | 0 |
| Gross salary ≤ 21000 | 0.75% × gross salary |

#### b.2 Employer's Share

| Conditions | ESI % |
|------------|-------|
| Gross salary > 21000 | 0 |
| Gross salary ≤ 21000 | 3.25% × gross salary |

#### b.3 Nominees
Registration of eligible employees

##### Contribution Period:
- 1st April to 30th September
- 1st Oct to 31st March of the year following

##### Nominee Removal:
Employee previously nominated for ESIC contribution, after appraisal no longer becomes eligible for ESIC. In this case, ESI contribution of this nominee has to continue up to the end of the contribution period.

#### b.4 ESIC No.
#### b.4.1 Report
Report containing details for generating challan
- ESIC report (cumulative - monthly, annually; individual list)

### c. TDS

#### c.1 Tax Slabs

##### < 60 years old:
| Taxable Income | Tax Rate |
|---------------|----------|
| < 250000 | 0% |
| 250000-500000 | 5% |
| 500000-1000000 | 20% |
| > 1000000 | 30% |

##### ≥ 60 years old:
| Taxable Income | Tax Rate |
|---------------|----------|
| ≤ 300000 | 0% |
| 250000-500000 | 5% |
| 500000-1000000 | 20% |
| > 1000000 | 30% |

*This is changeable by admin, as per current TDS slabs*

#### c.2 HRA Max Exemption Calculation

| Criteria | Amount |
|----------|---------|
| A | Actual Rent Paid as per actual |
| B | Rent Paid - 10% of fixed Basic Salary |
| C | HRA as per salary annex/mo × 12 months |
| D | 50% × (Fixed Basic + DA) |

**TOTAL MAX HRA EXEMPTION**: whichever is the minimum amount (A, B, C, D)

#### c.3 Calculation Process
Detailed TDS calculation including income after exemption, total deduction, and final tax computation.

### d. Gratuity

#### d.1 Eligibility
Regular employees who leave the Organization after minimum 4.5 years; employees terminated due to severe acts.

#### d.2 Calculation
**(FIXED BASIC WAGE RATE + DA) × NO. OF YEARS WORKED × 15/26**

Notes:
- Basic and DA is based on the last drawn salary
- No. of years worked: decimal no. from .5 will be rounded up, otherwise rounded down
- Max. ceiling of gratuity is 200000 (can change based on govt gratuity act)

#### d.3 Exemptions
Death or disablement -- company has the option to provide the gratuity

---

## Module - User Login

### 4.1 Log in Details
- **User name**: Full name
- **Password**: Secure password

### 4.2 User Details
Status, general details, personal details, employment details, etc.
- User can modify basic details, which will be approved by the admin

#### a.1 Upload Docs
Admin can send notification on documents required which user can upload

### 4.2 Attendance
- Attendance log in and log out
- GPS/face recognition (if possible)

### 4.3 Calendar
Shows the leaves taken (paid, unpaid), holidays (company approved holidays), weekly off, company events

### 4.4 Leave

#### a.1 Vacation Card
List of holidays, number of paid leaves available, number of paid leaves taken, number of unpaid/unapproved leaves taken

#### a.2 Leave Request Form
Standard leave application form

#### a.3 Leave Approval Status
Current status of leave applications

### 4.5 Outdoor Duty

#### a.1 Outdoor Duty Form
Filled up by user; HR and Managing Head will then be notified for approval

#### a.2 Upload Docs
User can upload receipts