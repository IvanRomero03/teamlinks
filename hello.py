import os

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear')
clear_terminal()

def dice_roll():
    import random
    return random.randint(1,6)

def main():
    print("Welcome to the dice ro       ll simulator!")    
    print("You rolled a " + str(dice_roll()))
    print("You rolled a " + str(dice_roll()))
    print("You rolled a " + str(dice_roll()))
    print("You rolled a " + str(dice_roll()))
    print("You rolled a " + str(dice_roll()))
    if input("Would you like to roll again? (y/n) ") == "y":
        main()
    else:
        print("Goodbye!")
        
    
main()






