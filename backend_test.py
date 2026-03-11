#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Louis
Tests all endpoints according to the review request
"""

import requests
import json
import sys
from datetime import datetime

# Use the production URL from frontend/.env
BASE_URL = "https://retro-coder-louis.preview.emergentagent.com/api"

def test_health_check():
    """Test GET /api/ - should return health check message"""
    print("🔍 Testing GET /api/ (health check)...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            expected_message = "Portfolio Louis API — Online ✓"
            expected_status = "ok"
            
            if data.get("message") == expected_message and data.get("status") == expected_status:
                print("   ✅ Health check passed")
                return True
            else:
                print(f"   ❌ Unexpected response format: {data}")
                return False
        else:
            print(f"   ❌ Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def test_post_contact_valid():
    """Test POST /api/contact with valid data"""
    print("🔍 Testing POST /api/contact (valid data)...")
    
    contact_data = {
        "name": "Jean Dupont",
        "email": "jean@test.fr", 
        "message": "Bonjour Louis, je cherche un développeur pour mon projet."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=contact_data)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            
            # Validate response structure
            required_fields = ["id", "name", "email", "message", "created_at", "read"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"   ❌ Missing fields in response: {missing_fields}")
                return False, None
                
            # Validate field values
            if (data["name"] == contact_data["name"] and 
                data["email"] == contact_data["email"] and 
                data["message"] == contact_data["message"] and
                data["read"] == False):
                
                print("   ✅ Valid contact created successfully")
                return True, data["id"]
            else:
                print(f"   ❌ Response data doesn't match input: {data}")
                return False, None
        else:
            print(f"   ❌ Expected status 201, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False, None

def test_post_contact_invalid():
    """Test POST /api/contact with invalid data"""
    print("🔍 Testing POST /api/contact (invalid data)...")
    
    invalid_data = {
        "name": "J",  # Too short (min 2)
        "email": "not-an-email",  # Invalid email
        "message": "short"  # Too short (min 10)
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 422:
            # Try to parse validation errors
            try:
                data = response.json()
                if "detail" in data:
                    print("   ✅ Validation errors returned as expected")
                    return True
                else:
                    print(f"   ❌ Unexpected error format: {data}")
                    return False
            except:
                # Even if we can't parse JSON, 422 is correct for validation errors
                print("   ✅ Validation error (422) returned as expected")
                return True
        else:
            print(f"   ❌ Expected status 422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def test_get_contacts(expected_contact_id=None):
    """Test GET /api/contact - retrieve all contacts"""
    print("🔍 Testing GET /api/contact (list contacts)...")
    
    try:
        response = requests.get(f"{BASE_URL}/contact")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print(f"   ✅ Returned list with {len(data)} contacts")
                
                # If we have an expected contact ID, verify it's in the list
                if expected_contact_id:
                    contact_found = any(contact.get("id") == expected_contact_id for contact in data)
                    if contact_found:
                        print(f"   ✅ Expected contact ID {expected_contact_id} found in list")
                    else:
                        print(f"   ❌ Expected contact ID {expected_contact_id} NOT found in list")
                        return False
                        
                return True
            else:
                print(f"   ❌ Expected list, got: {type(data)}")
                return False
        else:
            print(f"   ❌ Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def test_patch_contact_read_valid(contact_id):
    """Test PATCH /api/contact/{id}/read with valid ID"""
    print(f"🔍 Testing PATCH /api/contact/{contact_id}/read (valid ID)...")
    
    try:
        response = requests.patch(f"{BASE_URL}/contact/{contact_id}/read")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "ok":
                print("   ✅ Contact marked as read successfully")
                return True
            else:
                print(f"   ❌ Unexpected response: {data}")
                return False
        else:
            print(f"   ❌ Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def test_patch_contact_read_invalid():
    """Test PATCH /api/contact/invalid-id/read with invalid ID"""
    print("🔍 Testing PATCH /api/contact/invalid-id/read (invalid ID)...")
    
    try:
        response = requests.patch(f"{BASE_URL}/contact/invalid-id/read")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 404:
            print("   ✅ 404 error returned for invalid ID as expected")
            return True
        else:
            print(f"   ❌ Expected status 404, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def main():
    """Run all backend tests"""
    print("="*60)
    print("🚀 Starting Backend API Tests for Portfolio Louis")
    print(f"   Base URL: {BASE_URL}")
    print("="*60)
    
    results = []
    contact_id = None
    
    # Test 1: Health check
    results.append(test_health_check())
    
    # Test 2: POST valid contact
    success, contact_id = test_post_contact_valid()
    results.append(success)
    
    # Test 3: POST invalid contact
    results.append(test_post_contact_invalid())
    
    # Test 4: GET contacts
    results.append(test_get_contacts(contact_id))
    
    # Test 5: PATCH valid contact (mark as read)
    if contact_id:
        results.append(test_patch_contact_read_valid(contact_id))
    else:
        print("⚠️  Skipping PATCH test - no valid contact ID available")
        results.append(False)
    
    # Test 6: PATCH invalid contact
    results.append(test_patch_contact_read_invalid())
    
    # Summary
    print("\n" + "="*60)
    print("📊 TEST RESULTS SUMMARY")
    print("="*60)
    
    test_names = [
        "GET /api/ (health check)",
        "POST /api/contact (valid data)", 
        "POST /api/contact (invalid data)",
        "GET /api/contact (list contacts)",
        "PATCH /api/contact/{id}/read (valid ID)",
        "PATCH /api/contact/invalid-id/read (invalid ID)"
    ]
    
    passed = sum(results)
    total = len(results)
    
    for i, (name, result) in enumerate(zip(test_names, results)):
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{i+1}. {name}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())