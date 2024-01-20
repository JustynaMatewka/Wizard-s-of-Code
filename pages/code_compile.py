import subprocess

def main():
    with open('dane.txt', 'r') as file:
        code = file.read()
    # python3 podmiennić
    result = subprocess.run(['python3', '-c', code], capture_output=True, text=True)

    with open('result.txt', 'w') as file:
        file.write(result.stdout)

    return "Kod został przetestowany i wynik został zapisany"

print(main())