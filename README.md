# Scheme Navigator

Copy and paste this prompt into another coding assistant:

```text

Build a complete full-stack responsive web application named “Yojana Sathi”.

## Product

Yojana Sathi is a citizen-first government scheme finder for India. It helps citizens discover government schemes they may qualify for in under 30 seconds.

It also supports CSC operators, NGO field workers, and Anganwadi staff who complete the questionnaire for another person.

The application must use cautious language:

- “You may qualify”

- “Possible match”

- “Check the official portal”

- Never claim guaranteed approval.

There is no authentication, no account creation, no OTP, no chatbot, and no AI integration.

## Technology

Use:

- Frontend: React

- Backend: FastAPI

- Database: MongoDB

- Frontend language: JavaScript or TypeScript

- Backend language: Python

- API style: REST

- Frontend API URL: process.env.REACT_APP_BACKEND_URL

- Backend MongoDB URL: os.environ["MONGO_URL"]

- Backend database name: os.environ["DB_NAME"]

- Backend must run on 0.0.0.0:8001

- Frontend must be responsive and mobile-first.

## Required project structure

Create this structure:

yojana-sathi/

├── README.md

├── design_guidelines.json

├── memory/

│   ├── PRD.md

│   └── test_credentials.md

│

├── backend/

│   ├── .env

│   ├── requirements.txt

│   ├── server.py

│   ├── pytest.ini

│   └── tests/

│       └── test_public_api.py

│

├── frontend/

│   ├── .env

│   ├── package.json

│   ├── tailwind.config.js

│   ├── postcss.config.js

│   ├── jsconfig.json

│   ├── public/

│   │   └── index.html

│   └── src/

│       ├── index.js

│       ├── index.css

│       ├── App.js

│       ├── App.css

│       ├── constants/

│       │   └── testIds.js

│       └── components/

│           └── ui/

│               ├── button.jsx

│               ├── card.jsx

│               ├── checkbox.jsx

│               ├── dialog.jsx

│               ├── input.jsx

│               ├── label.jsx

│               ├── progress.jsx

│               ├── select.jsx

│               ├── sonner.jsx

│               ├── switch.jsx

│               └── other reusable UI components

│

└── scripts/

Do not include node_modules, build folders, cache folders, or compiled Python files.

## Backend API

Implement these endpoints:

### GET /api/health

Return:

{

  "status": "ok",

  "service": "yojana-sathi"

}

### GET /api/metadata

Return questionnaire options:

- states

- occupations

- categories

- incomes

- land_statuses

- yes_no

Example:

{

  "states": ["Maharashtra", "Uttar Pradesh", "Bihar"],

  "occupations": ["Farmer", "Daily wage worker", "Student"],

  "categories": ["General", "SC", "ST", "OBC"],

  "incomes": ["Below ₹1 lakh", "₹1–3 lakh", "₹3–5 lakh", "Above ₹5 lakh"],

  "land_statuses": ["Own land", "Lease land", "No land", "Not sure"],

  "yes_no": ["Yes", "No", "Not sure"]

}

### POST /api/match

Accept:

{

  "age": 35,

  "state": "Maharashtra",

  "occupation": "Farmer",

  "income": "Below ₹1 lakh",

  "category": "General",

  "land_status": "Own land",

  "bank_account": "Yes",

  "ration_card": "Yes",

  "assisted": false

}

Return:

{

  "profile": {},

  "strong_matches": [],

  "possible_matches": [],

  "total": 0

}

Each result must include:

- scheme_id

- name with localization-ready structure

- description

- benefits

- documents

- reason

- official_url

- availability

- last_verified

- match_type

- confidence

### GET /api/schemes/{scheme_id}

Return complete details for one scheme.

Return HTTP 404 if the scheme does not exist.

## Matching engine

Use deterministic rule-based matching.

Each scheme should contain structured rules such as:

{

  "occupation": ["Farmer"],

  "income": ["Below ₹1 lakh", "₹1–3 lakh"],

  "bank_account": ["Yes"],

  "age_min": 18,

  "age_max": 60

}

Classify results as:

- strong match: all relevant rules match

- possible match: some rules match and no major contradiction exists

- omit result: no meaningful match

Sort strong matches before possible matches.

Generate the reason from rule metadata. Reasons must be clear and cautious.

Example:

“You selected farming and land ownership, which are key PM-KISAN conditions.”

## Curated scheme dataset

Include approximately 17 representative schemes:

1. PM-KISAN

2. Pradhan Mantri Awaas Yojana – Gramin

3. Pradhan Mantri Awaas Yojana – Urban

4. Pradhan Mantri Ujjwala Yojana

5. Pradhan Mantri Jan-Dhan Yojana

6. Sukanya Samriddhi Yojana

7. Atal Pension Yojana

8. PM SVANidhi

9. PM-KUSUM

10. Stand-Up India

11. Post-Matric Scholarship

12. National Family Benefit Scheme

13. Indira Gandhi National Old Age Pension

14. Pradhan Mantri Suraksha Bima Yojana

15. Pradhan Mantri Jeevan Jyoti Bima Yojana

16. Mahatma Gandhi NREGA

17. Ayushman Bharat PM-JAY

Every scheme must include:

- Stable scheme ID

- English name

- Future localized names map, for example:

  {

    "en": "PM-KISAN",

    "hi": "",

    "mr": ""

  }

- Short description

- Benefits

- Structured eligibility rules

- Explanation template

- Required documents

- State or national availability

- Official application URL

- Source/reference URL

- Last verified date

- Active/inactive status

Use real official government URLs. Do not use fake links.

## Frontend user flow

### Landing page

Show:

- Brand: YOJANA SATHI

- Main headline:

“Find help.

Know your next step.”

- Supporting text:

“Answer a few simple questions and discover government schemes you may qualify for — in under 30 seconds.”

- Primary button:

“Start checking”

- Trust note:

“No account. No personal details saved.”

- Three-step visual index:

01 Profile

Tell us a little about the person

02 Match

See likely and possible schemes

03 Act

Take the next step with confidence

- Explain that the tool is useful for citizens and field helpers.

- Include a “For field helpers” section with:

“Filling this in for someone else?”

Include a button:

“Start assisted check”

### Header

Desktop header:

- YOJANA SATHI logo

- How it works

- For helpers

- Start checking

Mobile header:

- logo

- hamburger icon

- clicking hamburger must open a real navigation panel

- panel must contain:

  - How it works

  - For helpers

  - Start checking

- clicking the close icon must close the panel

### Questionnaire

Use one question or one small group per screen.

Questions:

1. How old is the person?

2. Which state do they live in?

3. What best describes their work?

4. What is the household’s yearly income?

5. Which social category applies?

6. What is their land status?

7. Do they have a bank account?

8. Does the household have a ration card?

Add:

- visible progress bar

- step indicator

- Back button

- Continue button

- validation for missing answers

- final button: “Show my matches”

- “Exit check” button

- assisted mode toggle:

  “I’m filling this in for someone else”

- helper text:

  “For a citizen, client or family member”

Use large tap targets on mobile.

### Results page

Header text:

“Your Yojana Sathi shortlist”

Example heading:

“A few paths

worth exploring.”

Display:

- number of matching schemes

- explanation that official portals make final decisions

- Copy summary button

- Print button

- WhatsApp button

- Edit answers button

- Start a new check button

Results must be grouped:

#### Strong matches

Text:

“These schemes line up closely with the answers.”

#### Possible matches

Text:

“There may be one more detail to confirm.”

Each scheme card must show:

- STRONG MATCH or POSSIBLE MATCH badge

- confidence percentage

- scheme name

- description

- WHY IT APPEARED section

- reason

- View details button

- Official portal link

When View details is opened, show:

- benefit

- documents to keep ready

- availability

- last verified date

Official links must open in a new tab.

### Sharing

Implement:

- Copy summary using navigator.clipboard

- Print using window.print()

- WhatsApp using:

https://wa.me/?text=ENCODED_SUMMARY

Show toast notifications for copy success and copy failure.

### Empty results

If no matches are found, show:

“No close matches

this time.”

Explain:

“Try reviewing your answers or checking the official welfare portal for additional options.”

Still provide:

- Edit answers

- Start a new check

## Visual design

Use the attached UI screenshot as the visual reference.

If no screenshot is available, follow this design direction exactly:

Theme:

- warm Swiss civic-utility interface

- light paper background

- high contrast

- editorial government-service layout

- not a generic SaaS dashboard

- not a purple gradient interface

- not dark mode by default

Colors:

--paper: #F7F4EE

--surface: #FFFDF8

--ink: #18232B

--muted-ink: #53616A

--line: #D7D2C8

--primary-red: #B42318

--primary-red-dark: #8F1D15

--signal-yellow: #F2C94C

--success-green: #176B4D

--possible-blue: #245B8A

Typography:

- Heading: IBM Plex Sans

- Body: Figtree

- Utility labels: IBM Plex Mono

- Do not use default Arial or Roboto as the main design language.

Layout:

- left-aligned editorial composition

- generous spacing

- asymmetric landing page

- warm subtle paper texture

- thin borders

- maximum 8px border radius

- no heavy card shadows

- red only for important actions and strong matches

- blue for possible matches

- green for success and privacy notes

- use icons from lucide-react

- do not use emoji as interface icons

Landing layout:

- desktop: asymmetric two-column hero

- left: headline and CTA

- right: three-step shortcut panel

- mobile: single-column stacked layout

- show a small portion of the next section below the first viewport

Questionnaire layout:

- desktop: left progress rail and main question area

- mobile: hide the side rail and show a horizontal progress bar

- one question per screen

- controls must be at least 44px tall

Results layout:

- strong matches first

- possible matches second

- cards should be readable and compact

- no nested cards

- print view must remove navigation and controls

- print output must include official URLs

## Accessibility and testing

Every interactive element and important user-facing element must have a unique data-testid.

Use kebab-case IDs such as:

- landing-start-button

- header-start-button

- mobile-menu-button

- mobile-menu-panel

- mobile-start-button

- questionnaire-step-progress

- assisted-workflow-switch

- questionnaire-next-button

- questionnaire-back-button

- questionnaire-submit-button

- scheme-result-card-1

- scheme-details-toggle-1

- scheme-details-panel-1

- scheme-official-link-1

- results-copy-button

- results-print-button

- results-whatsapp-button

- results-edit-button

- results-start-over-button

Add accessible labels, visible form labels, keyboard focus states, and aria-live messages for errors and completion.

Test:

1. Landing page loads.

2. Start checking opens questionnaire.

3. Empty answer validation works.

4. Assisted mode can be enabled.

5. User can complete all eight questions.

6. Matching API returns strong and possible results.

7. Results display reasons, benefits, documents, and official links.

8. Details expand and collapse.

9. Copy button works or shows a failure message.

10. Print button works.

11. WhatsApp link is generated.

12. Edit answers returns to questionnaire.

13. Start over returns to landing.

14. Mobile menu opens and closes.

15. No horizontal scrolling at 390px width.

16. API health, metadata, match, scheme detail, and 404 endpoints work.

17. No result says eligibility is guaranteed.

## Important implementation rules

- Do not add authentication.

- Do not add a chatbot.

- Do not add AI-generated matching.

- Do not collect unnecessary personal data.

- Do not persist citizen profiles.

- Do not use fake government URLs.

- Keep the matching deterministic and explainable.

- Use environment variables for API and MongoDB URLs.

- Do not hardcode secrets.

- Keep frontend and backend in one project.

- Make the application runnable and complete.

``` build this

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://yojanasathi.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2dc415d3-6cd3-487e-8583-fe99b3c62ef5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
