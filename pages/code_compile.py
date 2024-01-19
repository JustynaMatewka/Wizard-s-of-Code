def main():
    with open('dane.txt', 'r') as file:
        data = file.read()

    with open('result.txt', 'w') as file:
        file.write(data)

    return "Dane zostały przeczytane i zapisane"

print(main())