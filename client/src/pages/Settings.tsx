import {
  AccountSettingsCards,
  ChangePasswordCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";

const Settings = () => {
  return (
    <div className="w-full min-h-[90vh] bg-black px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <AccountSettingsCards
          classNames={{
            card: {
              base: `
                bg-white/5 backdrop-blur-md
                border border-white/10
                rounded-xl
                shadow-lg
              `,
              footer: `
                bg-white/3
                border-t border-white/10
                backdrop-blur-md
              `,
            },
          }}
        />

        <ChangePasswordCard
          classNames={{
            base: `
              bg-white/5 backdrop-blur-md
              border border-white/10
              rounded-xl
              shadow-lg
            `,
            footer: `
              bg-white/3
              border-t border-white/10
              backdrop-blur-md
            `,
          }}
        />

        <div className="w-full">
          <DeleteAccountCard
            classNames={{
              base: `
              bg-white/5 backdrop-blur-md
              border border-white/10
              rounded-xl
              shadow-lg
            `,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
