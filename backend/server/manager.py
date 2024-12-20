from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, username, email, name, address, password=None, **other_fields):
        
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            name=name,
            email=self.normalize_email(email),
            address=address,
            **other_fields
        )
        
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, name, address, password=None, **extra_fields):

        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(self, email, name, address, password, **extra_fields)
    