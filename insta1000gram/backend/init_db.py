import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from django.db import connection
from models import PSEOPart, PSEOPartKeyword, AdPlacement, AdsTxtEntry

with connection.schema_editor() as editor:
    for model in [PSEOPart, PSEOPartKeyword, AdPlacement, AdsTxtEntry]:
        try:
            editor.create_model(model)
            print(f"Created table for: {model.__name__}")
        except Exception as e:
            print(f"Notice for {model.__name__}: {e}")

print("All database tables are ready!")
