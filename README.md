# Saga
### A revolitionary attendance system for schools

> [!CAUTION]
> This product is still under active development and is not ready for production use.

## Running a Dev Build
1. Start by installing all packages
```
npm install
```

 2. Make 3 redis databases and make sure there configured in the server.py file

 3. Start FAST API
```
cd .venv
```

```
fastapi dev server.py
```
4. Start Next.js dev server
```
npm run dev
```
5. navigate to
```
http://localhost:3000
```

## Roadmap
- [ ] Stage 1
  - [ ] Records Attendance
  - [ ] Shows teacher schudle
  - [ ] Allows admins to mange attendance for all courses
  - [ ] Allow students to take thier own attendance
- [ ] Stage 2
  - [ ] Major interface upgrades
  - [ ] Mobile App for students
  - [ ] Reporting for adminstrators/counslers
  - [ ] Add flex peroids
- [ ] Stage 3
  - [ ] Add Clubs
  - [ ] Add sub acess
  - [ ] Add bulding check in / out
  - [ ] Intergrate behavior checkin alerts
