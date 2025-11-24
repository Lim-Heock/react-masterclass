import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

interface IForm {
  Email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password2: string;
  extraError?: string;
  age: number; // 숫자 타입으로 지정
  birthYear: number;
}

function ToDoList() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IForm>({
    defaultValues: {
      Email: '@naver.com',
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password2) {
      setError(
        'password2',
        { message: 'password are not the same' },
        { shouldFocus: true },
      );
    }
    setError('extraError', { message: 'Server offline' });
  };
  console.log(errors);

  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('Email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Please enter a valid email address',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.Email?.message as string}</span>
        <input
          {...register('firstName', {
            required: true,
            validate: value =>
              value.includes('lim') ? 'no lim allowed' : true,
          })}
          placeholder="firstName"
        />
        <span>{errors?.firstName?.message as string}</span>
        <input
          {...register('lastName', {
            required: 'write your last name',
            minLength: 10,
          })}
          placeholder="lastName"
        />
        <span>{errors?.lastName?.message as string}</span>
        <input
          {...register('userName', { required: true, minLength: 10 })}
          placeholder="userName"
        />
        <span>{errors?.userName?.message as string}</span>
        <input
          {...register('password', { required: true, minLength: 10 })}
          placeholder="password"
        />
        <span>{errors?.password?.message as string}</span>
        <input
          {...register('password2', { required: true, minLength: 10 })}
          placeholder="password2"
        />
        <span>{errors?.password2?.message as string}</span>
        <button type="submit">Add</button>
        <span>{errors?.extraError?.message as string}</span>

        {/* 문자열 입력을 숫자로 변환 */}
        {/* 숫자만 입력 가능한 키패드가 뜨는 input */}
        <input
          {...register('age', {
            setValueAs: (value: string) => parseInt(value, 10),
          })}
          type="number"
          placeholder="Age"
        />

        {/* 연도 입력을 4자리로 제한하고 숫자로 변환 */}
        {/* 날짜 선택기가 뜨는 input */}
        <input
          {...register('birthYear', {
            setValueAs: (value: string) => {
              const date = new Date(value);
              return date.getFullYear();
            },
          })}
          type="date"
          min="1900-01-01" // 최소 날짜 설정
          max={new Date().toISOString().split('T')[0]} // 현재 날짜까지만 허용
        />

        {/* 이메일은 type="email"로 변경 */}
        <input
          {...register('Email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Please enter a valid email address',
            },
          })}
          type="email"
          placeholder="Email"
        />
      </form>
    </div>
  );
}

export default ToDoList;
