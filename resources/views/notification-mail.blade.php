<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    <style>
       @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

        * {
            font-family: 'Inter', sans-serif
        }

        .page {
            width: 100%;
            background-color: #f0f2f1;
            padding: 5rem auto;
        }

        .standalone-box {
            width: 75%;
            height: fit-content;
            background-color: #ffffff;
            margin: 5rem 0;
            padding: 2rem 2rem;
            display: flex;
            flex-direction: column;
            border-radius: 0.5rem;  
        }

        .mail {
            text-align: center;
            padding-bottom: 2rem;
        }

        .mail-title {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .mail-details {
            text-align: center;
            font-size: 0.875rem;
        }

        @media only screen and (min-width: 750px) {

            .standalone-box {
                width: 65%;
            }

        }
    </style>
</head>
<body>
    <div class="page standalone-box-wrapper">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                    <div class="standalone-box mail">
                        <div class="mail">
                            <div class="mail-title">Уведомление с Dashboard</div>
                            <div class="mail-details">{{$text}}</div>
                        <div class="mail">  
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>