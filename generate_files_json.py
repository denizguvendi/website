import os
import json

# Define folder and extensions
folder = 'projects'
supported_extensions = ('.jpg', '.jpeg', '.png', '.pdf', '.txt')

# Collect files
file_list = []
for file_name in os.listdir(folder):
    if file_name.lower().endswith(supported_extensions):
        file_list.append({
            "name": file_name,
            "path": f"{folder}/{file_name}"
        })

# Write to JSON
with open('files.json', 'w', encoding='utf-8') as f:
    json.dump(file_list, f, indent=2)

print(f"✅ {len(file_list)} files written to files.json")
