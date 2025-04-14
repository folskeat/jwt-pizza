Penetration Testing Report \- CS329  
Keaton Folsom and Yukina Soga

Self Attacks

Yukina Soga

| Item           | Result                                                                                                                                                                                                                                                  |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Date           | April 14, 2025                                                                                                                                                                                                                                          |
| Target         | pizza.cs329-yukinasoga.click                                                                                                                                                                                                                            |
| Classification | Broken Authentication (attempted)                                                                                                                                                                                                                       |
| Severity       | N/A (Attack unsuccessful)                                                                                                                                                                                                                               |
| Description    | I tried to get admin access by changing my login token in two ways: (1) changing my role from "diner" to "admin", and (2) trying the "none" algorithm trick to bypass security checks. The website rejected both attempts with "unauthorized" messages. |
| Images         | ![yuso1](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/ys1.png)                                                                                                                                                                                                                                             |
| Corrections    | I may not have set up my proxy settings properly, which could have affected my ability to fully test changing the roles. \-\> From the peer review, it was able to change the roles with right proxy setting.                                           |

Keaton

| Item           | Result                                                                                                                                                                  |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date           | 4/12/25                                                                                                                                                                 |
| Target         | pizza.goodegg.click                                                                                                                                                     |
| Classification | Injection                                                                                                                                                               |
| Severity       | 3 \- Medium                                                                                                                                                             |
| Description    | Manipulated response object to get access to the admin page. Even without access to admin privileges, being able to access the admin page could lead to instances where |
| Images         | ![kefo1](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/kf_s1.png)                                                                                                                                                             |
| Corrections    | Keep roles internal and not part of any request or response object.                                                                                                     |

| Item           | Result                                                                           |
| :------------- | :------------------------------------------------------------------------------- |
| Date           | 4/12/25                                                                          |
| Target         | pizza.goodegg.click                                                              |
| Classification | Injection                                                                        |
| Severity       | 2 \- High                                                                        |
| Description    | Pizzas could be ordered for free, potentially allowing us to lose lots of money. |
| Images         | ![kefo2](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/kf_s2.png)                                                                      |
| Corrections    | Added a check to see if pizza prices were lowered.                               |

Peer Attacks

Yukina Soga

| Item           | Result                                                                                                                                                                                      |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Date           | April 14, 2025                                                                                                                                                                              |
| Target         | pizza.goodegg.click                                                                                                                                                                         |
| Classification | Identification and Authentication Failures                                                                                                                                                  |
| Severity       | 3 (Medium)                                                                                                                                                                                  |
| Description    | The application allows unlimited failed login attempts without implementing account lockouts. This vulnerability could allow attackers to perform brute force attacks against user accounts |
| Images         | ![yuso2](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/ys2.png)                                                                                                                                                                                 |
| Corrections    | Implement progressive delays after failed login attempts, account lockout after a threshold of failures,                                                                                    |

Yukina Soga

| Item           | Result                                                                                                                                                                            |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date           | April 14, 2025                                                                                                                                                                    |
| Target         | pizza.goodegg.click                                                                                                                                                               |
| Classification | ​​Unlimited Order Quantity                                                                                                                                                        |
| Severity       | 3 (Medium)                                                                                                                                                                        |
| Description    | The website lets customers order as many pizzas as they want in one order with no limits.Someone could order 1000+ pizzas to crash the system or cause problems for the business. |
| Images         | ![yuso3](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/ys3.png)                                                                                                                                                                       |
| Corrections    | Set a reasonable limit on how many pizzas can be ordered at once. Add checks to prevent unusually large orders.                                                                   |

Yukina Soga

| Item           | Result                                                                                                                                                                                       |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date           | April 14, 2025                                                                                                                                                                               |
| Target         | pizza.goodegg.click                                                                                                                                                                          |
| Classification | ​​Error Messages Show Too Much Information                                                                                                                                                   |
| Severity       | 4 (Low)                                                                                                                                                                                      |
| Description    | When there's an error, the website shows detailed information about files and code. This gives hackers clues about how the website works, which could help them find more security problems. |
| Images         | ![yuso4](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/ys4.png)                                                                                                                                                                                  |
| Corrections    | Hide detailed error information from users. Show simple error messages instead. Save the detailed errors in private logs.                                                                    |

Keaton

I decided to see if the same problems existed. But this time I decided to register a user as an admin instead of simply logging in as an admin.

| Item           | Result                                                                                                                |
| :------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Date           | 4/14/25                                                                                                               |
| Target         | pizza.cs329-yukinasoga.click                                                                                          |
| Classification | Injection                                                                                                             |
| Severity       | 3 \- Medium                                                                                                           |
| Description    | Manipulated response object to get access to the admin page. Registered a user as an admin using the response object. |
| Images         | ![kefo3](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/kf_p1.png)                                                                                                           |
| Corrections    | Keep role checking out of request or response objects.                                                                |

The free pizza tactic worked yet again.

| Item           | Result                                                                                         |
| :------------- | :--------------------------------------------------------------------------------------------- |
| Date           | 4/14/25                                                                                        |
| Target         | pizza.cs329-yukinasoga.click                                                                   |
| Classification | Injection                                                                                      |
| Severity       | 2 \- High                                                                                      |
| Description    | Pizzas could be ordered for free, potentially allowing us to lose lots of money.               |
| Images         | ![kefo4](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/kf_p2.png)                                                                                    |
| Corrections    | Add a check to ensure pizza prices are not manipulated, or don’t send price in request object. |

| Item           | Result                                                                                                                 |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Date           | 4/14/25                                                                                                                |
| Target         | pizza.cs329-yukinasoga.click                                                                                           |
| Classification | Insecure Design                                                                                                        |
| Severity       | 1 \- Critical                                                                                                          |
| Description    | Default admin password was not changed.                                                                                |
| Images         | ![kefo5](https://github.com/folskeat/jwt-pizza/blob/main/penetrationTests/images/kf_p3.png)                                                                                                            |
| Corrections    | Change the default admin password and re-initialize the database. Password should probably changed frequently as well. |

Combined summary of what we learned:

It doesn’t take an expert hacker to find vulnerabilities in a website. A self educated individual with a little bit of time and the right tools can exploit a website and cause millions of bitcoins of damage if the right safety measures are not in place. We also learned of the power of small level attacks, you can cause damage by just repeating requests. You don’t even need to get into the system to cause havoc. It was interesting to see how others try different ways to penetrate the website, and since the best way to strengthen your website is to think how others will get into your website, seeing how others think is interesting.

Even though both of us were trying to use the same idea to attack the website, not knowing how to navigate Burp properly did not give one person the results that could have happened. We both thought learning how to use Burp was interesting, and we wish we had learned how to navigate it well in class or had more time to explore.

Put on your white cap and think celestial\!
