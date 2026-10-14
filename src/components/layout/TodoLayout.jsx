
function ToDoLayout({ children }) {
    return (
        <main
            className="
        fixed left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[min(62.5rem,calc(100%-32px))]
        min-h-[600px]
        max-h-[calc(100vh-32px)]
        overflow-y-auto
        rounded-3xl border border-[#eeeeee]
        bg-white
        shadow-[0_4px_25px_rgba(0,0,0,0.08)]
        max-md:w-[calc(100%-24px)]
        max-md:min-h-0
        max-md:max-h-[calc(100vh-24px)]
        max-md:rounded-2xl
        max-sm:w-[calc(100%-20px)]
        max-sm:max-h-[calc(100vh-20px)]
        max-sm:rounded-xl
      "
        >
            <div
                className="
          mx-auto flex w-full max-w-[450px]
          min-h-full flex-col justify-center
          px-5 py-8
          max-md:px-[18px] max-md:py-7
          max-sm:px-[14px] max-sm:py-6
        "
            >
                <h1
                    className="
            font-['Montserrat','Helvetica_Neue',sans-serif]
            text-2xl font-bold text-[#4a4a4a]
            max-md:text-[1.4rem]
            max-sm:text-[1.3rem]
          "
                >
                    Your To Do
                </h1>
                {/* Nội dung được truyền từ App.jsx */}
                {children}

                <footer>
                    <h2
                        className="
              mb-[10px] text-sm italic
              text-[#5a5555]
              max-sm:text-[13px]
            "
                    >
                        Your remaining todos: 3
                    </h2>

                    <p
                        className="
              text-[13px] italic leading-5
              text-[#999999]
              max-sm:text-xs max-sm:leading-[18px]
            "
                    >
                        "Doing what you love is the cornerstone of having
                        abundance in your life." - Wayne Dyer
                    </p>
                </footer>
            </div>
        </main>
    );
}

export default ToDoLayout;
