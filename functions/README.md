# functions

このフォルダはCloudFunctionのリポジトリになります。

## Firestoreのセキュリティルールについて

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{document} {
      allow read: if true;
      allow update, write: if request.auth.uid == document;
      allow create: if request.auth != null;
      match /{allChildren=**} {
         allow create, read, update, write: if request.auth.uid == document;
      }
    }
  }
}