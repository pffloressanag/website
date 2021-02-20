from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError


# Make sure this class is not the same name as "UserCreationForm"
class UserCreateForm(UserCreationForm):

    def clean_email(self):
        email = self.cleaned_data['email']
        email_source = email.split('@')[-1]
        permitted_sources = ['live.esu.edu']

        if email_source not in permitted_sources:
            raise ValidationError("That is not a valid email address.")

        return email

    class Meta:
        # the fields I want the user to be able to access when they are signing up
        fields = ('username', 'email', 'password1', 'password2')
        model = get_user_model()

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.is_active = False
            user.save()
        return user

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].label = 'Display Name'
        self.fields['email'].label = 'Email Address'
