import subprocess

def main():
    with open('dane.txt', 'r') as file:
        code = file.read()

    lines_counter = len(code.splitlines())
    if(lines_counter < 4):
        result = "0"
    else:
        # python3 podmiennić
        # result = subprocess.run(['python3', '-c', code], capture_output=True, text=True)
        result = subprocess.run(['python', '-c', code], capture_output=True, text=True)
        result = result.stdout
        if("[0, 1, 2, 3, 10, 15]" in result):
            result = "100"
        else:
            result = "50"

    with open('result.txt', 'w') as file:
        file.write(result)

    return "Kod został przetestowany i wynik został zapisany"

print(main())