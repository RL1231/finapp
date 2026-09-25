import csv
from datetime import datetime, timedelta
import random

first_names = ["John", "Jane", "Alex", "Emily", "Chris", "Sarah", "Michael", "Jessica", "David", "Laura"]
last_names = ["Smith", "Doe", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Taylor", "Anderson", "Thomas"]
role_names = ["USER", "ADMIN"]

file_name = "financial_dummy_data_365.csv"
fields = ["first_name", "last_name", "username", "email", "role_name", "report_date", "income", "expenditures"]

# Start on the first day of the year
start_date = datetime(2025, 1, 1)

with open(file_name, mode="w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(fields)

    first = random.choice(first_names)
    last = random.choice(last_names)
    username = f"{first.lower()}_{last.lower()}{random.randint(10, 99)}"
    email = f"{username}@example.com"
    role_name = random.choice(role_names)
    
    # Generate exactly one row for each day of a 365-day year
    for i in range(365):
        current_date = start_date + timedelta(days=i)
        report_date = current_date.strftime("%Y-%m-%d")
        
        if current_date.weekday() == 4:
            income = round(random.uniform(900.00, 1200.00), 2)
        else:
            income = 0
        expenditures = round(random.uniform(0.00, 160.00), 2)
        
        writer.writerow([first, last, username, email, role_name, report_date, income, expenditures])

print(f"File '{file_name}' created successfully with 365 rows!")
