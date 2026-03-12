#!/bin/bash
#
# Seed Cognito User Pool with test users.
# Usage: ./seed-cognito-users.sh <USER_POOL_ID>
#

set -euo pipefail

USER_POOL_ID="${1:?Usage: $0 <USER_POOL_ID>}"

echo "Seeding Cognito User Pool: ${USER_POOL_ID}"
echo "==========================================="

# --- requester1 ---
echo ""
echo "Creating user: requester1 (role=requester)"
aws cognito-idp admin-create-user \
  --user-pool-id "${USER_POOL_ID}" \
  --username requester1 \
  --user-attributes Name=email,Value=requester1@example.com Name=email_verified,Value=true Name=custom:role,Value=requester \
  --message-action SUPPRESS

aws cognito-idp admin-set-user-password \
  --user-pool-id "${USER_POOL_ID}" \
  --username requester1 \
  --password 'Requester1!' \
  --permanent

aws cognito-idp admin-update-user-attributes \
  --user-pool-id "${USER_POOL_ID}" \
  --username requester1 \
  --user-attributes Name=custom:role,Value=requester

echo "  requester1 created successfully."

# --- reviewer1 ---
echo ""
echo "Creating user: reviewer1 (role=reviewer)"
aws cognito-idp admin-create-user \
  --user-pool-id "${USER_POOL_ID}" \
  --username reviewer1 \
  --user-attributes Name=email,Value=reviewer1@example.com Name=email_verified,Value=true Name=custom:role,Value=reviewer \
  --message-action SUPPRESS

aws cognito-idp admin-set-user-password \
  --user-pool-id "${USER_POOL_ID}" \
  --username reviewer1 \
  --password 'Reviewer1!' \
  --permanent

aws cognito-idp admin-update-user-attributes \
  --user-pool-id "${USER_POOL_ID}" \
  --username reviewer1 \
  --user-attributes Name=custom:role,Value=reviewer

echo "  reviewer1 created successfully."

# --- approver1 ---
echo ""
echo "Creating user: approver1 (role=approver)"
aws cognito-idp admin-create-user \
  --user-pool-id "${USER_POOL_ID}" \
  --username approver1 \
  --user-attributes Name=email,Value=approver1@example.com Name=email_verified,Value=true Name=custom:role,Value=approver \
  --message-action SUPPRESS

aws cognito-idp admin-set-user-password \
  --user-pool-id "${USER_POOL_ID}" \
  --username approver1 \
  --password 'Approver1!' \
  --permanent

aws cognito-idp admin-update-user-attributes \
  --user-pool-id "${USER_POOL_ID}" \
  --username approver1 \
  --user-attributes Name=custom:role,Value=approver

echo "  approver1 created successfully."

echo ""
echo "==========================================="
echo "All users created successfully!"
echo ""
echo "  requester1 / Requester1! (role: requester)"
echo "  reviewer1  / Reviewer1!  (role: reviewer)"
echo "  approver1  / Approver1!  (role: approver)"
echo ""
