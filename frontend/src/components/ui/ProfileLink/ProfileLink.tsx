import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

const ProfileLink = () => {
  const currentUser = useTypedSelector((state) => state.user.user)
  return (
    <div className="flex items-center gap-4">
      <Link to="/profile">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5002 8C10.2911 8 8.50024 9.79086 8.50024 12C8.50024 14.2091 10.2911 16 12.5002 16C14.7094 16 16.5002 14.2091 16.5002 12C16.5002 9.79086 14.7094 8 12.5002 8ZM10.5002 12C10.5002 10.8954 11.3957 10 12.5002 10C13.6048 10 14.5002 10.8954 14.5002 12C14.5002 13.1046 13.6048 14 12.5002 14C11.3957 14 10.5002 13.1046 10.5002 12Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.7867 0.5C10.3858 0.5 9.1461 1.46745 8.87171 2.85605L8.79264 3.25622C8.60489 4.20638 7.56195 4.83059 6.54511 4.48813L6.14825 4.35447C4.82246 3.90796 3.33873 4.42968 2.61836 5.63933L1.90492 6.83735C1.17773 8.05846 1.45435 9.60487 2.53927 10.5142L2.85714 10.7806C3.62939 11.4279 3.62939 12.5721 2.85714 13.2194L2.53927 13.4858C1.45435 14.3951 1.17773 15.9415 1.90492 17.1626L2.61833 18.3606C3.33872 19.5703 4.8225 20.092 6.14831 19.6455L6.54506 19.5118C7.56191 19.1693 8.6049 19.7935 8.79264 20.7437L8.87172 21.1439C9.1461 22.5325 10.3858 23.5 11.7867 23.5H13.2136C14.6146 23.5 15.8543 22.5325 16.1287 21.1438L16.2077 20.7438C16.3954 19.7936 17.4384 19.1693 18.4553 19.5118L18.8521 19.6455C20.1779 20.092 21.6617 19.5703 22.3821 18.3606L23.0955 17.1627C23.8227 15.9416 23.546 14.3951 22.4611 13.4858L22.1432 13.2194C21.3709 12.5722 21.3709 11.4278 22.1432 10.7806L22.4611 10.5142C23.546 9.60489 23.8227 8.05845 23.0955 6.83732L22.3821 5.63932C21.6617 4.42968 20.178 3.90795 18.8522 4.35444L18.4552 4.48814C17.4384 4.83059 16.3954 4.20634 16.2077 3.25617L16.1287 2.85616C15.8543 1.46751 14.6146 0.5 13.2136 0.5H11.7867ZM10.8338 3.24375C10.9149 2.83334 11.2983 2.5 11.7867 2.5H13.2136C13.7021 2.5 14.0855 2.83336 14.1666 3.24378L14.2456 3.64379C14.6791 5.83811 16.9909 7.09167 19.0935 6.38353L19.4905 6.24984C19.9495 6.09527 20.4394 6.28595 20.6637 6.66264L21.3771 7.86064C21.5946 8.22587 21.5208 8.69271 21.1764 8.98135L20.8586 9.24773C19.1325 10.6943 19.1325 13.3057 20.8586 14.7523L21.1764 15.0186C21.5208 15.3073 21.5946 15.7741 21.3771 16.1394L20.6637 17.3373C20.4394 17.714 19.9495 17.9047 19.4905 17.7501L19.0936 17.6164C16.9909 16.9082 14.6791 18.1618 14.2456 20.3562L14.1666 20.7562C14.0855 21.1666 13.7021 21.5 13.2136 21.5H11.7867C11.2983 21.5 10.9149 21.1667 10.8338 20.7562L10.7547 20.356C10.3211 18.1617 8.00931 16.9082 5.90665 17.6165L5.5099 17.7501C5.05092 17.9047 4.56104 17.714 4.33671 17.3373L3.6233 16.1393C3.4058 15.7741 3.47959 15.3073 3.82398 15.0186L4.14185 14.7522C5.86782 13.3056 5.86781 10.6944 4.14185 9.24779L3.82398 8.98137C3.47959 8.69273 3.4058 8.2259 3.6233 7.86067L4.33674 6.66266C4.56106 6.28596 5.05093 6.09528 5.5099 6.24986L5.90676 6.38352C8.00938 7.09166 10.3211 5.83819 10.7547 3.64392L10.8338 3.24375Z"
            fill="white"
          />
        </svg>
      </Link>
      <Link
        to={`/dashboard/${currentUser?.role === 'supervisor' ? 'user' : currentUser?.role}`}
        className="flex items-center md:gap-4 text-sm text-base-100"
      >
        <p className="hidden md:block">Личный кабинет</p>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="30" rx="5" fill="white" />
          <path
            d="M15 15C13.4875 15 12.1927 14.4615 11.1156 13.3844C10.0385 12.3073 9.5 11.0125 9.5 9.5C9.5 7.9875 10.0385 6.69271 11.1156 5.61563C12.1927 4.53854 13.4875 4 15 4C16.5125 4 17.8073 4.53854 18.8844 5.61563C19.9615 6.69271 20.5 7.9875 20.5 9.5C20.5 11.0125 19.9615 12.3073 18.8844 13.3844C17.8073 14.4615 16.5125 15 15 15ZM4 26V22.15C4 21.3708 4.20075 20.6549 4.60225 20.0022C5.00375 19.3496 5.53633 18.8509 6.2 18.5063C7.62083 17.7958 9.06458 17.2632 10.5312 16.9085C11.9979 16.5538 13.4875 16.3759 15 16.375C16.5125 16.3741 18.0021 16.5519 19.4687 16.9085C20.9354 17.2651 22.3792 17.7977 23.8 18.5063C24.4646 18.85 24.9976 19.3487 25.3991 20.0022C25.8006 20.6558 26.0009 21.3718 26 22.15V26H4Z"
            fill="#0A25FA"
          />
        </svg>
      </Link>
    </div>
  )
}

export default ProfileLink
