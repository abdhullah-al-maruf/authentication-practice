"use client";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter(); // this hook use for redirect to the home page

  const onSubmit = async (e) => {
    e.preventDefault();
    // step-2 now get the value from the from as target.name.value
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // now copy the code for signup from better auth for send the data into mongodb
    // and this way data will send to the db
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          // show loading
          <p>loading.....</p>;
        },
        onSuccess: (ctx) => {
          // redirect to the dashboard or sign in page
          router.push("/");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );

    // console.log(data, error);
  };
  return (
    <div>
      {/* step-1 crate a form and make a function for on submit */}
      <Form
        className="flex w-96 flex-col gap-4 mx-auto mt-8"
        onSubmit={onSubmit}
      >
        <TextField className="w-full max-w-64" name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
        </TextField>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
